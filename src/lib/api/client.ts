/**
 * Resilient API Client Helper
 * 
 * Capabilities:
 * - Configurable timeouts via AbortSignal
 * - Safe retries with exponential backoff on 5xx, 429, or network errors
 * - Request ID tagging for distributed tracing
 * - Optional Zod schema response validation
 * - Safe error handling (never throws uncaught network errors)
 */

import { z } from 'zod'

export interface SafeFetchOptions extends RequestInit {
  timeoutMs?: number
  retries?: number
  retryDelayMs?: number
  requestId?: string
  schema?: z.ZodTypeAny
}

export interface SafeFetchResult<T = unknown> {
  ok: boolean
  status: number
  data?: T
  error?: string
  requestId: string
  attempts: number
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function safeFetch<T = unknown>(
  url: string,
  options: SafeFetchOptions = {}
): Promise<SafeFetchResult<T>> {
  const {
    timeoutMs = 10000,
    retries = 1,
    retryDelayMs = 250,
    requestId = (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `req_${Date.now()}`),
    schema,
    headers = {},
    ...fetchInit
  } = options

  const reqHeaders = new Headers(headers)
  if (!reqHeaders.has('x-request-id')) {
    reqHeaders.set('x-request-id', requestId)
  }

  let attempts = 0
  let lastError = 'Unknown request failure'
  let lastStatus = 0

  while (attempts <= retries) {
    attempts++
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const response = await fetch(url, {
        ...fetchInit,
        headers: reqHeaders,
        signal: controller.signal,
      })
      clearTimeout(timer)

      lastStatus = response.status

      // If client-side error (4xx except 429), do not retry
      if (!response.ok) {
        let errDetail = `HTTP ${response.status} ${response.statusText}`
        try {
          const body = await response.text()
          if (body) {
            errDetail = body.length > 200 ? `${body.slice(0, 200)}...` : body
          }
        } catch {
          // ignore body reading error
        }

        const isRetryable = response.status === 429 || response.status >= 500
        if (!isRetryable || attempts > retries) {
          return {
            ok: false,
            status: response.status,
            error: errDetail,
            requestId,
            attempts,
          }
        }

        // Wait before retry
        await wait(retryDelayMs * Math.pow(2, attempts - 1))
        continue
      }

      // 2xx Success: Parse JSON or text
      let parsedData: unknown
      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        parsedData = await response.json()
      } else {
        parsedData = await response.text()
      }

      // Optional Zod Schema validation
      if (schema) {
        const validation = schema.safeParse(parsedData)
        if (!validation.success) {
          return {
            ok: false,
            status: response.status,
            error: `Schema validation failed: ${validation.error.issues.map((i) => i.message).join(', ')}`,
            requestId,
            attempts,
          }
        }
        parsedData = validation.data
      }

      return {
        ok: true,
        status: response.status,
        data: parsedData as T,
        requestId,
        attempts,
      }
    } catch (err: unknown) {
      clearTimeout(timer)
      if (err instanceof Error && err.name === 'AbortError') {
        lastError = `Request timed out after ${timeoutMs}ms`
      } else if (err instanceof Error) {
        lastError = err.message
      } else {
        lastError = String(err)
      }

      if (attempts > retries) {
        return {
          ok: false,
          status: lastStatus || 0,
          error: lastError,
          requestId,
          attempts,
        }
      }

      await wait(retryDelayMs * Math.pow(2, attempts - 1))
    }
  }

  return {
    ok: false,
    status: lastStatus,
    error: lastError,
    requestId,
    attempts,
  }
}
