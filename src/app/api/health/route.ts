/**
 * Health & Readiness Check Endpoint
 * 
 * Capabilities:
 * - Basic liveness probe (GET /api/health)
 * - Returns uptime, environment configuration readiness (without leaking secrets)
 * - Standardized JSON contract using apiSuccess
 */

import { NextRequest } from 'next/server'
import { apiSuccess } from '@/lib/api/response'
import { isSupabaseConfigured } from '@/lib/supabase/config'

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') ?? undefined

  const healthData = {
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      supabaseConfigured: isSupabaseConfigured(),
      aiConfigured: Boolean(
        process.env.OPENAI_API_KEY ||
        process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
        process.env.GROQ_API_KEY
      ),
    },
  }

  return apiSuccess(healthData, {
    status: 200,
    requestId,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
