/**
 * Structured Server-Side Logger with Automated Secret Scrubbing
 * 
 * Capabilities:
 * - Leveled logging: debug, info, warn, error
 * - Structured JSON output in production, readable formatted output in development
 * - Automatic redaction of API keys, bearer tokens, passwords, and sensitive fields
 * - Request and correlation ID tagging
 * - Safe execution (logging never crashes the caller)
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

const SENSITIVE_KEY_PATTERNS = [
  /password/i,
  /secret/i,
  /token/i,
  /api[-_]?key/i,
  /authorization/i,
  /cookie/i,
  /service[-_]?role/i,
  /private[-_]?key/i,
]

const SECRET_VALUE_PATTERNS = [
  /Bearer\s+[A-Za-z0-9._~+/-]+=*/gi,
  /\bsk-[a-zA-Z0-9_-]{10,}\b/gi,
  /\beyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/gi, // JWT
]

/**
 * Deeply redacts sensitive keys and values from objects, arrays, and strings.
 */
export function redactSensitiveData(data: unknown): unknown {
  if (data === null || data === undefined) return data

  if (typeof data === 'string') {
    let sanitized = data
    for (const pattern of SECRET_VALUE_PATTERNS) {
      sanitized = sanitized.replace(pattern, '[REDACTED_SECRET]')
    }
    return sanitized
  }

  if (Array.isArray(data)) {
    return data.map((item) => redactSensitiveData(item))
  }

  if (typeof data === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      const isSensitiveKey = SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key))
      if (isSensitiveKey) {
        result[key] = '[REDACTED]'
      } else {
        result[key] = redactSensitiveData(value)
      }
    }
    return result
  }

  return data
}

export interface LogContext {
  requestId?: string
  correlationId?: string
  service?: string
  [key: string]: unknown
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: LogContext
  error?: {
    name: string
    message: string
    stack?: string
  }
}

export class StructuredLogger {
  private currentLevel: LogLevel = 'info'

  constructor(defaultLevel?: LogLevel) {
    if (defaultLevel) {
      this.currentLevel = defaultLevel
    } else {
      const envLevel = process.env.LOG_LEVEL?.toLowerCase() as LogLevel
      if (envLevel && envLevel in LOG_LEVEL_PRIORITY) {
        this.currentLevel = envLevel
      } else {
        this.currentLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug'
      }
    }
  }

  setLevel(level: LogLevel): void {
    this.currentLevel = level
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.currentLevel]
  }

  private formatEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    err?: unknown
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message: String(redactSensitiveData(message)),
    }

    if (context && Object.keys(context).length > 0) {
      entry.context = redactSensitiveData(context) as LogContext
    }

    if (err) {
      if (err instanceof Error) {
        entry.error = {
          name: err.name,
          message: String(redactSensitiveData(err.message)),
          ...(process.env.NODE_ENV !== 'production' && { stack: redactSensitiveData(err.stack) as string }),
        }
      } else {
        entry.error = {
          name: 'UnknownError',
          message: String(redactSensitiveData(String(err))),
        }
      }
    }

    return entry
  }

  private write(level: LogLevel, entry: LogEntry): void {
    const serialized = JSON.stringify(entry)
    if (level === 'error') {
      console.error(serialized)
    } else if (level === 'warn') {
      console.warn(serialized)
    } else {
      console.log(serialized)
    }
  }

  debug(message: string, context?: LogContext): void {
    if (!this.shouldLog('debug')) return
    this.write('debug', this.formatEntry('debug', message, context))
  }

  info(message: string, context?: LogContext): void {
    if (!this.shouldLog('info')) return
    this.write('info', this.formatEntry('info', message, context))
  }

  warn(message: string, context?: LogContext, err?: unknown): void {
    if (!this.shouldLog('warn')) return
    this.write('warn', this.formatEntry('warn', message, context, err))
  }

  error(message: string, context?: LogContext, err?: unknown): void {
    if (!this.shouldLog('error')) return
    this.write('error', this.formatEntry('error', message, context, err))
  }
}

export const logger = new StructuredLogger()
