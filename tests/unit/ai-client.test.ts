import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateText, generateStructured } from '@/lib/ai/client'
import { z } from 'zod'

describe('Unified AI Client', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    delete process.env.OPENAI_API_KEY
    delete process.env.GOOGLE_GENERATIVE_AI_API_KEY
    delete process.env.GROQ_API_KEY
  })

  it('generates text using mock provider when no provider specified and no keys set', async () => {
    const res = await generateText({ prompt: 'Hello world' })
    expect(res.success).toBe(true)
    expect(res.provider).toBe('mock')
    expect(res.data).toContain('Mock AI Response')
    expect(res.latencyMs).toBeGreaterThanOrEqual(0)
  })

  it('fails gracefully when OpenAI provider is chosen but no API key is configured', async () => {
    const res = await generateText({ prompt: 'Hello', provider: 'openai' })
    expect(res.success).toBe(false)
    expect(res.error).toContain('Missing API key for provider openai')
  })

  it('fails gracefully when Gemini provider is chosen but no API key is configured', async () => {
    const res = await generateText({ prompt: 'Hello', provider: 'gemini' })
    expect(res.success).toBe(false)
    expect(res.error).toContain('Missing GOOGLE_GENERATIVE_AI_API_KEY')
  })

  it('returns structured mock data with mockResponse fixture', async () => {
    const schema = z.object({
      summary: z.string(),
      score: z.number(),
    })

    const res = await generateStructured({
      prompt: 'Score this essay',
      provider: 'mock',
      schema,
      mockResponse: { summary: 'Great job', score: 95 },
    })

    expect(res.success).toBe(true)
    expect(res.data).toEqual({ summary: 'Great job', score: 95 })
  })

  it('parses structured JSON output when calling OpenAI-compatible mock response', async () => {
    process.env.OPENAI_API_KEY = 'mock-key-for-test'
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({
        choices: [{ message: { content: '{"answer": "Paris", "confidence": 0.99}' } }],
        usage: { prompt_tokens: 15, completion_tokens: 10, total_tokens: 25 },
      }),
    })

    const schema = z.object({
      answer: z.string(),
      confidence: z.number(),
    })

    const res = await generateStructured({
      prompt: 'Capital of France?',
      provider: 'openai',
      schema,
    })

    expect(res.success).toBe(true)
    expect(res.data).toEqual({ answer: 'Paris', confidence: 0.99 })
    expect(res.usage?.totalTokens).toBe(25)
  })
})
