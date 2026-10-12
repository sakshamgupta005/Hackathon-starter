# Modular Hackathon Capability Library

This catalog is an inventory of modular, production-ready capabilities provided by the **Hackathon Starter**. It adheres to the skeleton-first philosophy: **The starter serves the future product; the future product does not serve the starter.**

Every capability is optional, lazily evaluated, dependency-minimal, and tested. Missing credentials or unused modules never crash the application.

---

## Capability Status Legend

- `READY`: Fully implemented, documented, and covered by passing automated tests.
- `PARTIAL`: Core logic implemented; requires provider credentials or application-specific schema to activate.
- `DOCUMENTED`: Architectural pattern or implementation guide provided; implementation is ready to drop in when problem statement requires it.
- `NOT IMPLEMENTED`: Candidate capability evaluated and intentionally deferred to keep the starter lean.

---

## Capability Matrix & Hackathon Ranking

Capabilities are ranked by reuse frequency across hackathons, implementation time saved, security risk mitigation, and maintenance overhead:

| Rank | Capability | Domain | Status | Location / Artifact | Test Evidence |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **1** | **Safe Internal Redirects** | Security | `READY` | [`src/lib/utils/redirect.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/utils/redirect.ts) | 11 tests in `redirect.test.ts` |
| **2** | **Resilient API Client (`safeFetch`)** | Reliability | `READY` | [`src/lib/api/client.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/api/client.ts) | 7 tests in `api-client.test.ts` |
| **3** | **Structured Server Logger & Secret Masking** | Observability | `READY` | [`src/lib/logging/logger.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/logging/logger.ts) | 4 tests in `logger.test.ts` |
| **4** | **Standardized API Error/Success Responses** | Reliability | `READY` | [`src/lib/api/response.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/api/response.ts) | 3 tests in `api-response.test.ts` |
| **5** | **Health & Readiness Check Probes** | Reliability | `READY` | [`src/app/api/health/route.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/app/api/health/route.ts) | 1 unit test + 1 Playwright E2E probe |
| **6** | **HTTP Defense-in-Depth Security Headers** | Security | `READY` | [`src/lib/security/headers.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/headers.ts) | 2 tests in `security-headers.test.ts` |
| **7** | **In-Memory Rate Limiting** | Security / Cost | `READY` | [`src/lib/security/rate-limit.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/rate-limit.ts) | 4 tests in `rate-limit.test.ts` |
| **8** | **Input & Output Sanitization** | Security | `READY` | [`src/lib/security/sanitize.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/sanitize.ts) | 4 tests in `sanitize.test.ts` |
| **9** | **File Upload Security & Constraints** | Security | `READY` | [`src/lib/security/upload.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/upload.ts) | 4 tests in `upload-validation.test.ts` |
| **10** | **Server Authentication Guard** | Security | `READY` | [`src/lib/supabase/auth-guard.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/supabase/auth-guard.ts) | 3 tests in `auth-guard.test.ts` |
| **11** | **Unified AI Client & Mock Adapter** | AI / LLM | `READY` | [`src/lib/ai/client.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/ai/client.ts) | 5 tests in `ai-client.test.ts` |
| **12** | **Bounded Agent Workflow Engine** | Agents | `READY` | [`src/lib/agent/workflow.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/workflow.ts) | 3 tests in `agent-workflow.test.ts` |
| **13** | **Reusable UI State Views** | UI Patterns | `READY` | [`src/components/ui/state-views.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/state-views.tsx) | 4 tests in `state-views.test.tsx` |
| **14** | **Application Error Boundaries** | Reliability | `READY` | [`src/app/error.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/app/error.tsx) & [`global-error.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/app/global-error.tsx) | 2 tests in `error-boundary.test.tsx` |
| **15** | **Reusable Test Fixtures & Mock Generators** | QA / Testing | `READY` | `tests/fixtures/` (`auth.ts`, `api.ts`, `ai.ts`) | 4 tests in `fixtures.test.ts` |
| **16** | **Zero-Crash Environment Management** | Reliability | `READY` | [`src/lib/env.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/env.ts) | 8 tests in `env.test.ts` + `env:check` |
| **17** | **Supabase Auth & Session Refresh** | Identity | `READY` | [`src/lib/supabase/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/supabase/) | 6 unit & E2E tests |
| **18** | **CI Workflow with Diagnostics & Concurrency** | DevOps / CI | `READY` | [`.github/workflows/ci.yml`](file:///c:/Users/rspma/Downloads/Hackathon-starter/.github/workflows/ci.yml) | Verified in GitHub Actions schema |
| **19** | **Vector Search / RAG Pipeline (pgvector)** | AI / Data | `DOCUMENTED` | Supabase `pgvector` guide | Guide only |
| **20** | **File Validation & Storage Uploads** | Storage | `DOCUMENTED` | Supabase Storage guide | Guide only |

---

## 1. Security & Traffic Control

### 1.1 Safe Internal Redirects
- **Status**: `READY`
- **Location**: [`src/lib/utils/redirect.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/utils/redirect.ts)
- **Test Command**: `npm test tests/unit/redirect.test.ts`
- **What it does**: Validates redirect query parameters and form inputs. Blocks open redirects by rejecting absolute URLs (`https://`), protocol-relative paths (`//`, `/\`, `\\`), non-HTTP schemes (`javascript:`, `data:`), and control characters (`\r`, `\n`).

### 1.2 In-Memory Sliding-Window Rate Limiter
- **Status**: `READY`
- **Location**: [`src/lib/security/rate-limit.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/rate-limit.ts)
- **Test Command**: `npm test tests/unit/rate-limit.test.ts`
- **What it does**: Restricts request bursts per IP or user identifier using an in-memory sliding window. Extracts proxy IPs via `getClientIp()`. Emits standard headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`).

### 1.3 HTTP Defense-in-Depth Security Headers
- **Status**: `READY`
- **Location**: [`src/lib/security/headers.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/headers.ts) & [`next.config.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/next.config.ts)
- **Test Command**: `npm test tests/unit/security-headers.test.ts`
- **What it does**: Enforces clickjacking prevention (`X-Frame-Options: DENY`), MIME sniffing protection (`X-Content-Type-Options: nosniff`), referrer control (`Referrer-Policy: strict-origin-when-cross-origin`), HSTS (`Strict-Transport-Security`), and Turbopack-compatible Content-Security-Policy across all application routes.

### 1.4 Input & Output Sanitization
- **Status**: `READY`
- **Location**: [`src/lib/security/sanitize.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/sanitize.ts)
- **Test Command**: `npm test tests/unit/sanitize.test.ts`
- **What it does**: Safe utility helpers: `escapeHtml()` (XSS prevention), `stripHtmlTags()`, `sanitizeFileName()` (blocking path traversal and null bytes), and `sanitizePlainText()` (stripping control characters).

### 1.5 File Upload Security & Size Constraints
- **Location**: [`src/lib/security/upload.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/upload.ts)
- **Status**: `READY`
- **Test Command**: `npm test tests/unit/upload-validation.test.ts`
- **What it does**: Pre-validates uploaded files against size caps (default 5MB), MIME type allowlists (`image/png`, `application/pdf`, etc.), and blocks dangerous executable/script extensions (`.exe`, `.sh`, `.bat`, `.php`, `.js`, `.py`, `.svg`, `.html`). Returns sanitized filenames.

### 1.6 Server Authentication Guard
- **Status**: `READY`
- **Location**: [`src/lib/supabase/auth-guard.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/supabase/auth-guard.ts)
- **Test Command**: `npm test tests/unit/auth-guard.test.ts`
- **What it does**: Enforces server-verified authentication via `supabase.auth.getUser()` for Server Actions and Route Handlers without trusting unverified browser cookies.

---

## 2. Reliability & Networking

### 2.1 Resilient API Client (`safeFetch`)
- **Status**: `READY`
- **Location**: [`src/lib/api/client.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/api/client.ts)
- **Test Command**: `npm test tests/unit/api-client.test.ts`
- **What it does**: Wraps native `fetch` with AbortController timeouts, automatic exponential backoff with jitter on 5xx and 429 status codes, idempotency protection (never blindly retries POST/PATCH unless explicitly marked `idempotent: true`), request ID tagging (`x-request-id`), safe error object returns, and optional Zod response schema validation.

### 2.2 Standardized API Error & Success Responses
- **Status**: `READY`
- **Location**: [`src/lib/api/response.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/api/response.ts)
- **Test Command**: `npm test tests/unit/api-response.test.ts`
- **What it does**: Uniform JSON response constructors for Route Handlers and Server Actions (`apiSuccess`, `apiError`). Automatically logs internal exceptions server-side while replacing messages with a generic fallback in production.

### 2.3 Health & Readiness Probes
- **Status**: `READY`
- **Location**: [`src/app/api/health/route.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/app/api/health/route.ts)
- **Test Command**: `npm test tests/unit/health-route.test.ts`
- **What it does**: Exposes `GET /api/health` returning system uptime, status (`healthy`), and non-sensitive environment configuration readiness.

### 2.4 Application Error Boundaries
- **Status**: `READY`
- **Location**: [`src/app/error.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/app/error.tsx) & [`src/app/global-error.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/app/global-error.tsx)
- **Test Command**: `npm test tests/components/error-boundary.test.tsx`
- **What it does**: Prevents white-screen crashes on client and root layout failures, providing clean recovery CTAs with reset callbacks.

### 2.5 Zero-Crash Environment Registry
- **Status**: `READY`
- **Location**: [`src/lib/env.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/env.ts)
- **Test Command**: `npm test tests/unit/env.test.ts` && `npm run env:check`
- **What it does**: Centralizes provider metadata, scopes (`client` vs `server`), placeholder rejection, and safe validation. Prevents missing optional keys from crashing the application at boot or in CI.

---

## 3. Observability & Logging

### 3.1 Structured Server Logger with Automated Secret Redaction
- **Status**: `READY`
- **Location**: [`src/lib/logging/logger.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/logging/logger.ts)
- **Test Command**: `npm test tests/unit/logger.test.ts`
- **What it does**: Leveled logging (`debug`, `info`, `warn`, `error`) with structured JSON serialization, request ID / correlation ID tracking, and deep recursive secret scrubbing (`Bearer ...`, `sk-...`, JWTs, passwords).

---

## 4. AI & Agent Capabilities

### 4.1 Unified AI Client & Mock Adapter
- **Status**: `READY`
- **Location**: [`src/lib/ai/client.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/ai/client.ts)
- **Test Command**: `npm test tests/unit/ai-client.test.ts`
- **What it does**: Single interface for LLM completions (`generateText`) and structured data extraction (`generateStructured`) with Zod schema validation. Resolves available keys or falls back to an offline `'mock'` mode.

### 4.2 Bounded Agent Workflow Engine
- **Status**: `READY`
- **Location**: [`src/lib/agent/workflow.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/workflow.ts)
- **Test Command**: `npm test tests/unit/agent-workflow.test.ts`
- **What it does**: Executes deterministic or multi-step agent pipelines (Plan -> Execute -> Verify). Enforces a hard iteration cap (`maxIterations: 15`) and execution timeout to prevent runaway loops.

---

## 5. UI Patterns & Presentation

### 5.1 Reusable UI State Views
- **Status**: `READY`
- **Location**: [`src/components/ui/state-views.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/state-views.tsx)
- **Test Command**: `npm test tests/components/state-views.test.tsx`
- **What it does**: Ready-to-use, accessible state panels: `<LoadingState />`, `<EmptyState />`, `<ErrorState />`, and `<SuccessState />`.

---

## 6. Testing, CI & DevOps

### 6.1 Reusable Test Fixtures & Mock Generators
- **Status**: `READY`
- **Location**: `tests/fixtures/` ([`auth.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/tests/fixtures/auth.ts), [`api.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/tests/fixtures/api.ts), [`ai.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/tests/fixtures/ai.ts))
- **Test Command**: `npm test tests/integration/fixtures.test.ts`
- **What it does**: Centralized, deterministic factories for generating mock users, sessions, HTTP Response objects, and AI payloads for 100% offline testing.

### 6.2 Automated Smoke & E2E Test Suite
- **Status**: `READY`
- **Location**: [`tests/e2e/smoke.spec.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/tests/e2e/smoke.spec.ts)
- **Test Command**: `npm run test:e2e`
- **What it does**: Runs Playwright tests across Landing, Login, Signup, 404, Dashboard preview, and the `/api/health` API probe.

### 6.3 Automated CI with Concurrency & Failure Diagnostics
- **Status**: `READY`
- **Location**: [`.github/workflows/ci.yml`](file:///c:/Users/rspma/Downloads/Hackathon-starter/.github/workflows/ci.yml)
- **What it does**: Executes lint, typecheck, Vitest, Turbopack build, Playwright smoke tests, and environment validation. Cancels redundant concurrent runs and uploads diagnostic reports on failure.
