/**
 * Unified AI Client Interface with Structured Outputs & Mock Fallback
 * 
 * Capabilities:
 * - Single interface for common LLM tasks (text completion, structured JSON extraction)
 * - Safe schema validation via Zod
 * - Built-in 'mock' mode for offline development, component testing, and CI
 * - Graceful fallback behavior if keys are missing or requests fail
 * - Usage and latency measurement
 */

import { z } from 'zod'
import { safeFetch } from '@/lib/api/client'

export type AIProvider = 'mock' | 'openai' | 'gemini' | 'groq'

export interface AIOptions {
  prompt: string
  system?: string
  provider?: AIProvider
  model?: string
  temperature?: number
  apiKey?: string
  timeoutMs?: number
}

export interface AIStructuredOptions<T> extends AIOptions {
  schema: z.ZodType<T>
  schemaName?: string
  mockResponse?: T
}

export interface AIResult<T = string> {
  success: boolean
  data?: T
  error?: string
  provider: AIProvider
  model: string
  latencyMs: number
  usage?: {
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
  }
}

function resolveProvider(requested?: AIProvider): AIProvider {
  if (requested) return requested
  if (process.env.OPENAI_API_KEY) return 'openai'
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) return 'gemini'
  if (process.env.GROQ_API_KEY) return 'groq'
  return 'mock'
}

/**
 * Generates plain text completion.
 */
export async function generateText(options: AIOptions): Promise<AIResult<string>> {
  const start = Date.now()
  const provider = resolveProvider(options.provider)
  const model = options.model ?? (provider === 'mock' ? 'mock-model' : 'default')

  if (provider === 'mock') {
    return {
      success: true,
      data: `[Mock AI Response for: "${options.prompt.slice(0, 40)}..."]`,
      provider: 'mock',
      model: 'mock-model',
      latencyMs: Date.now() - start,
      usage: { promptTokens: 10, completionTokens: 15, totalTokens: 25 },
    }
  }

  // OpenAI-compatible endpoint (OpenAI or Groq)
  if (provider === 'openai' || provider === 'groq') {
    const isGroq = provider === 'groq'
    const apiKey = options.apiKey ?? (isGroq ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY)
    const baseUrl = isGroq ? 'https://api.groq.com/openai/v1' : 'https://api.openai.com/v1'
    const defaultModel = isGroq ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini'

    if (!apiKey) {
      return {
        success: false,
        error: `Missing API key for provider ${provider}. Add key or use provider: 'mock'.`,
        provider,
        model: options.model ?? defaultModel,
        latencyMs: Date.now() - start,
      }
    }

    const res = await safeFetch<{
      choices?: Array<{ message?: { content?: string } }>
      usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number }
    }>(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: options.model ?? defaultModel,
        messages: [
          ...(options.system ? [{ role: 'system', content: options.system }] : []),
          { role: 'user', content: options.prompt },
        ],
        temperature: options.temperature ?? 0.7,
      }),
      timeoutMs: options.timeoutMs ?? 15000,
    })

    if (!res.ok || !res.data) {
      return {
        success: false,
        error: res.error || 'Failed to complete OpenAI-compatible request',
        provider,
        model: options.model ?? defaultModel,
        latencyMs: Date.now() - start,
      }
    }

    const content = res.data.choices?.[0]?.message?.content ?? ''
    return {
      success: true,
      data: content,
      provider,
      model: options.model ?? defaultModel,
      latencyMs: Date.now() - start,
      usage: {
        promptTokens: res.data.usage?.prompt_tokens,
        completionTokens: res.data.usage?.completion_tokens,
        totalTokens: res.data.usage?.total_tokens,
      },
    }
  }

  // Google Gemini API
  if (provider === 'gemini') {
    const apiKey = options.apiKey ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY
    const geminiModel = options.model ?? 'gemini-1.5-flash'

    if (!apiKey) {
      return {
        success: false,
        error: 'Missing GOOGLE_GENERATIVE_AI_API_KEY. Add key or use provider: "mock".',
        provider: 'gemini',
        model: geminiModel,
        latencyMs: Date.now() - start,
      }
    }

    const res = await safeFetch<{
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
      usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number; totalTokenCount?: number }
    }>(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: options.prompt }] }],
      }),
      timeoutMs: options.timeoutMs ?? 15000,
    })

    if (!res.ok || !res.data) {
      return {
        success: false,
        error: res.error || 'Failed to complete Gemini request',
        provider: 'gemini',
        model: geminiModel,
        latencyMs: Date.now() - start,
      }
    }

    const content = res.data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    return {
      success: true,
      data: content,
      provider: 'gemini',
      model: geminiModel,
      latencyMs: Date.now() - start,
      usage: {
        promptTokens: res.data.usageMetadata?.promptTokenCount,
        completionTokens: res.data.usageMetadata?.candidatesTokenCount,
        totalTokens: res.data.usageMetadata?.totalTokenCount,
      },
    }
  }

  return {
    success: false,
    error: `Unsupported provider: ${provider}`,
    provider,
    model,
    latencyMs: Date.now() - start,
  }
}

/**
 * Generates structured, type-safe data validated against a Zod schema.
 */
export async function generateStructured<T>(
  options: AIStructuredOptions<T>
): Promise<AIResult<T>> {
  const start = Date.now()
  const provider = resolveProvider(options.provider)

  // Fast mock return
  if (provider === 'mock') {
    if (options.mockResponse) {
      return {
        success: true,
        data: options.mockResponse,
        provider: 'mock',
        model: 'mock-model',
        latencyMs: Date.now() - start,
      }
    }

    // Attempt to synthesize mock data from schema if no fixture provided
    try {
      const parsed = options.schema.parse({})
      return {
        success: true,
        data: parsed,
        provider: 'mock',
        model: 'mock-model',
        latencyMs: Date.now() - start,
      }
    } catch {
      return {
        success: false,
        error: 'Mock provider requires options.mockResponse when schema has required fields.',
        provider: 'mock',
        model: 'mock-model',
        latencyMs: Date.now() - start,
      }
    }
  }

  // Request JSON structure in prompt
  const schemaInstructions = `Return ONLY raw JSON matching this format without markdown code fences or explanation.`
  const textRes = await generateText({
    ...options,
    prompt: `${options.prompt}\n\n${schemaInstructions}`,
  })

  if (!textRes.success || !textRes.data) {
    return {
      success: false,
      error: textRes.error || 'Structured generation failed',
      provider: textRes.provider,
      model: textRes.model,
      latencyMs: Date.now() - start,
    }
  }

  // Clean markdown code blocks if model returned them
  let cleanJson = textRes.data.trim()
  if (cleanJson.startsWith('```')) {
    cleanJson = cleanJson.replace(/^```json?\s*/i, '')
    if (cleanJson.endsWith('```')) {
      cleanJson = cleanJson.slice(0, -3)
    }
    cleanJson = cleanJson.trim()
  }

  try {
    const rawParsed = JSON.parse(cleanJson)
    const validated = options.schema.safeParse(rawParsed)

    if (!validated.success) {
      return {
        success: false,
        error: `Validation error: ${validated.error.issues.map((i) => i.message).join(', ')}`,
        provider: textRes.provider,
        model: textRes.model,
        latencyMs: Date.now() - start,
      }
    }

    return {
      success: true,
      data: validated.data,
      provider: textRes.provider,
      model: textRes.model,
      latencyMs: Date.now() - start,
      usage: textRes.usage,
    }
  } catch (parseError) {
    return {
      success: false,
      error: `Failed to parse response as JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
      provider: textRes.provider,
      model: textRes.model,
      latencyMs: Date.now() - start,
    }
  }
}
