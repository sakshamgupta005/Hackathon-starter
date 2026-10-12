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
| **2** | **Resilient API Client (`safeFetch`, `createApiClient`)** | Reliability | `READY` | [`src/lib/api/client.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/api/client.ts) | 28 tests in `api-client.test.ts` & `frontend-data-layer.test.tsx` |
| **3** | **Structured Server Logger & Secret Masking** | Observability | `READY` | [`src/lib/logging/logger.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/logging/logger.ts) | 4 tests in `logger.test.ts` |
| **4** | **Standardized API Error/Success Responses** | Reliability | `READY` | [`src/lib/api/response.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/api/response.ts) | 3 tests in `api-response.test.ts` |
| **5** | **Health & Readiness Check Probes** | Reliability | `READY` | [`src/app/api/health/route.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/app/api/health/route.ts) | 1 unit test + 1 Playwright E2E probe |
| **6** | **HTTP Defense-in-Depth Security Headers** | Security | `READY` | [`src/lib/security/headers.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/headers.ts) | 2 tests in `security-headers.test.ts` |
| **7** | **In-Memory Rate Limiting** | Security / Cost | `READY` | [`src/lib/security/rate-limit.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/rate-limit.ts) | 4 tests in `rate-limit.test.ts` |
| **8** | **Input & Output Sanitization** | Security | `READY` | [`src/lib/security/sanitize.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/sanitize.ts) | 4 tests in `sanitize.test.ts` |
| **9** | **File Upload Security & Constraints** | Security | `READY` | [`src/lib/security/upload.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/security/upload.ts) | 4 tests in `upload-validation.test.ts` |
| **10** | **Server Authentication Guard** | Security | `READY` | [`src/lib/supabase/auth-guard.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/supabase/auth-guard.ts) | 3 tests in `auth-guard.test.ts` |
| **11** | **Unified AI Client & Provider Adapters** | AI / LLM | `READY` | [`src/lib/ai/client.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/ai/client.ts) | 12 tests in `ai-client.test.ts` |
| **12** | **Bounded Agent Workflow Engine** | Agents | `READY` | [`src/lib/agent/workflow.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/workflow.ts) | 6 tests in `agent-workflow.test.ts` |
| **13** | **Generic Tool Registry & Harness** | Agents | `READY` | [`src/lib/agent/tools.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/tools.ts) | 6 tests in `agent-loop.test.ts` |
| **14** | **Bounded Autonomous Agent Loop** | Agents | `READY` | [`src/lib/agent/loop.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/loop.ts) | 8 tests in `agent-loop.test.ts` |
| **15** | **Workflow Checkpoints & Verification** | Agents | `READY` | [`src/lib/agent/checkpoint.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/checkpoint.ts) | 11 tests in `agent-checkpoint.test.ts` |
| **16** | **AI Planner, Improvement Loops & Gates** | Agents | `READY` | [`src/lib/agent/orchestrator.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/orchestrator.ts) | 12 tests in `agent-orchestrator.test.ts` |
| **17** | **Modular Integration Framework & Open-Source Adapters** | Integrations | `READY` | [`src/lib/integrations/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/integrations/) | 20 tests in `integration-registry.test.ts` |
| **18** | **Reusable RAG & Document Intelligence Toolkit** | AI / RAG | `READY` | [`src/lib/rag/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/rag/) | 19 tests in `rag-toolkit.test.ts` |
| **19** | **Reusable Speech & Voice Toolkit (STT, TTS, Pipeline)** | Voice / Audio | `READY` | [`src/lib/speech/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/speech/) & [`src/hooks/use-audio-recorder.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/hooks/use-audio-recorder.ts) | 22 tests in `speech-toolkit.test.ts` & `audio-recorder.test.tsx` |
| **20** | **Reusable OCR & Multimodal Vision Toolkit** | AI / Vision | `READY` | [`src/lib/vision/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/vision/) | 13 tests in `ocr-vision-toolkit.test.ts` |
| **21** | **Reusable Web Search & External Data Toolkit** | AI / Search | `READY` | [`src/lib/search/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/search/) | 21 tests in `search-toolkit.test.ts` |
| **22** | **Reusable Auth & Authorization Toolkit (RBAC/ABAC)** | Identity / Security | `READY` | [`src/lib/auth/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/auth/) | 23 tests in `auth-toolkit.test.ts` & `auth-toolkit.test.tsx` |
| **23** | **Accessible UI Component & Form Library** | UI Patterns | `READY` | [`src/components/ui/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/) | 23 tests in `ui.test.tsx` & `ui-library.test.tsx` |
| **24** | **Data Components (Table, Search, Upload)** | Data & UI | `READY` | [`src/components/ui/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/) | 19 tests in `ui-library.test.tsx` |
| **25** | **Application Layouts & Shells** | UI Layouts | `READY` | [`src/components/layout/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/layout/) (`app-shell.tsx`, `page-header.tsx`) | 24 tests in `layout-templates.test.tsx` |
| **26** | **Reusable Page Templates** | UI Patterns | `READY` | [`src/components/templates/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/templates/) | 24 tests in `layout-templates.test.tsx` |
| **27** | **Page-Level States & Banners** | UI Patterns | `READY` | [`src/components/ui/state-views.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/state-views.tsx) | 24 tests in `layout-templates.test.tsx` |
| **28** | **Frontend Data Layer & Async Hooks** | Data & State | `READY` | [`src/hooks/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/hooks/) & [`src/lib/data/cache.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/data/cache.ts) | 21 tests in `frontend-data-layer.test.tsx` |
| **29** | **Real-Time Communication (WebSocket & SSE Consumer)** | Real-Time / Data | `READY` | [`src/lib/realtime/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/realtime/) & [`src/hooks/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/hooks/) | 12 tests in `realtime.test.tsx` |
| **30** | **Application Error Boundaries** | Reliability | `READY` | [`src/app/error.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/app/error.tsx) & [`global-error.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/app/global-error.tsx) | 2 tests in `error-boundary.test.tsx` |
| **31** | **Reusable Test Fixtures & Mock Generators** | QA / Testing | `READY` | `tests/fixtures/` (`auth.ts`, `api.ts`, `ai.ts`) | 4 tests in `fixtures.test.ts` |
| **32** | **Zero-Crash Environment Management** | Reliability | `READY` | [`src/lib/env.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/env.ts) | 8 tests in `env.test.ts` + `env:check` |
| **33** | **Supabase Auth & Session Refresh** | Identity | `READY` | [`src/lib/supabase/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/supabase/) | 6 unit & E2E tests |
| **34** | **CI Workflow with Diagnostics & Concurrency** | DevOps / CI | `READY` | [`.github/workflows/ci.yml`](file:///c:/Users/rspma/Downloads/Hackathon-starter/.github/workflows/ci.yml) | Verified in GitHub Actions schema |
| **35** | **Reusable Database, Storage & Caching Toolkit** | Data / Persistence | `READY` | [`src/lib/database/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/database/), [`src/lib/storage/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/storage/), [`src/lib/cache/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/cache/) | 18 tests in `database-storage-cache.test.ts` |
| **36** | **Reusable Maps, Geolocation & Routing Toolkit** | Geospatial / UI | `READY` | [`src/lib/geo/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/geo/), [`src/components/geo/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/geo/) | 24 tests in `maps-geospatial-toolkit.test.ts` & `map-components.test.tsx` |
| **37** | **Reusable Payments & Webhook Toolkit** | Payments / Webhooks | `READY` | [`src/lib/payments/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/payments/) | 18 tests in `payments-webhook-toolkit.test.ts` |
| **38** | **Reusable Background Jobs & Workflow Toolkit** | Async / Workflows | `READY` | [`src/lib/jobs/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/jobs/) | 17 tests in `jobs-workflow-toolkit.test.ts` |

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

### 1.7 Reusable Authentication & Authorization Toolkit (RBAC/ABAC)
- **Status**: `READY`
- **Location**: [`src/lib/auth/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/auth/) (`password.ts`, `session.ts`, `authorization.ts`, `providers/mock.ts`, `providers/oauth.ts`, `context.tsx`, `types.ts`, `index.ts`)
- **Test Command**: `npm test tests/unit/auth-toolkit.test.ts tests/components/auth-toolkit.test.tsx`
- **What it does**: Provider-neutral authentication and CASL-inspired authorization framework inspired by **Better Auth**, **Auth.js**, **Lucia**, and **CASL**:
  - **Password Security**: Standard Node.js `scrypt` hashing with 16-byte cryptographically random salts and `timingSafeEqual` comparison to eliminate timing side-channel attacks. Complexity validator requiring 8+ chars with mixed letters and numbers.
  - **Session Management**: 32-byte entropy cryptographically random tokens, configurable TTL and expiration, and production-ready cookie options (`httpOnly: true`, `sameSite: 'lax'`, `secure: true`, `path: '/'`).
  - **CASL-Style Ability Engine**: Declarative `Ability` rules supporting actions, subjects, wildcards (`'manage'` and `'all'`), inverted rules (`cannot('delete', 'all')`), and fine-grained ABAC context checks (e.g. `project.ownerId === user.id`).
  - **Server-Side Guards**: `requireRole(user, allowedRoles)` and `requirePermission(ability, action, subject, context)` returning standardized 401 Unauthorized or 403 Forbidden responses.
  - **OAuth & PKCE CSRF Defense**: One-time-use CSRF state tokens with 10-minute expiry and SHA-256 PKCE code challenge generation to secure third-party login callbacks.
  - **Frontend State & Components**: `<AuthProvider>`, `useAuth()`, `useAbility()`, `<Can I="update" an="Project" this={project}>`, and `<ProtectedRoute roles={['admin']} fallback={<PermissionDeniedState />}>`.

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

### 4.1 Unified AI Client & Modular Provider Adapters
- **Status**: `READY`
- **Location**: [`src/lib/ai/client.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/ai/client.ts), [`src/lib/ai/types.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/ai/types.ts), and adapters in `src/lib/ai/adapters/` (`mock.ts`, `openai.ts`, `gemini.ts`)
- **Test Command**: `npm test tests/unit/ai-client.test.ts`
- **What it does**: Modular interface for text generation (`generateText`) and structured entity extraction (`generateStructured`):
  - **Modular Provider Adapters**: Decoupled handlers for `mock`, `openai`, `gemini`, and `groq`.
  - **Explicit Provider Fallback**: Supports configured secondary providers (`fallback: 'mock'` or `fallback: { provider, model, apiKey }`). Never silently switches providers or incurs unexpected paid costs. Returns `fallbackAttempted: true`, `primaryError`, and `attempts: 2`.
  - **Normalized Error Handling**: Structured error codes (`MISSING_API_KEY`, `RATE_LIMITED`, `TIMEOUT`, `NETWORK_ERROR`, `INVALID_RESPONSE`, `VALIDATION_ERROR`, `UPSTREAM_ERROR`) with retryability flags.
  - **Strictly Bounded Repair Loop**: Automatically repairs malformed JSON or Zod schema mismatches via targeted repair prompts (`maxRepairAttempts`, hard-capped at 2 max).
  - **Falsy Fixture Support**: Deterministic offline mock testing supports falsy responses (`false`, `0`, `""`, `null`).
  - **Usage Transparency**: Preserves exact token counts from providers without inventing numbers when missing.


### 4.2 Bounded Agent Workflow Engine
- **Status**: `READY`
- **Location**: [`src/lib/agent/workflow.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/workflow.ts)
- **Test Command**: `npm test tests/unit/agent-workflow.test.ts`
- **What it does**: Executes deterministic or multi-step agent pipelines (Plan -> Execute -> Verify). Enforces a hard iteration cap (`maxIterations`, default 15, max 50), configuration and step validation, real step timeout interruption via `Promise.race`, external cancellation using `AbortSignal`, and structured stop reasons (`completed`, `max_iterations`, `timeout`, `cancelled`, `error`).

### 4.3 Generic Tool Registry & Execution Harness
- **Status**: `READY`
- **Location**: [`src/lib/agent/tools.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/tools.ts)
- **Test Command**: `npm test tests/unit/agent-loop.test.ts`
- **What it does**: Generic, type-safe registry for model-callable tools. Validates input arguments using Zod schemas prior to execution, prevents arbitrary code execution by strictly checking registered tools, enforces per-tool timeouts and `AbortSignal` cancellation, and annotates side-effects (`isReadOnly`) to protect against duplicate mutating operations.

### 4.4 Bounded Autonomous Agent Loop
- **Status**: `READY`
- **Location**: [`src/lib/agent/loop.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/loop.ts)
- **Test Command**: `npm test tests/unit/agent-loop.test.ts`
- **What it does**: Autonomous loop coordinating model reasoning, approved tool calls, and observation feedback. Features multi-level safety limits: maximum iterations, maximum total tool calls, overall timeout, and per-tool timeout. Prevents automatic retries of failed side-effecting tools (payments, emails, writes), redacts secrets from prompt contexts, and provides explicit stop reasons (`completed`, `max_iterations`, `max_tool_calls`, `timeout`, `cancelled`, `error`).

### 4.5 Workflow Checkpoints, Resumability & Execution Verification
- **Status**: `READY`
- **Location**: [`src/lib/agent/checkpoint.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/checkpoint.ts) & [`src/lib/agent/workflow.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/workflow.ts)
- **Test Command**: `npm test tests/unit/agent-checkpoint.test.ts`
- **What it does**: Versioned workflow checkpoints (`WorkflowCheckpoint`, schema v1) with pluggable storage adapters (`InMemoryCheckpointStorage` included for dev/testing). Enables interrupted workflows to resume without repeating previously completed steps. Includes side-effect uncertainty guards (`uncertainStepId`) that prevent re-running failed external actions unless explicitly permitted. Provides post-execution verification for steps and tools, returning structured outcomes (`passed`, `failed`, `inconclusive`, `skipped`) with bounded verification retries. Emits sanitized telemetry events without leaking secrets or tokens.

### 4.6 AI Planning, Improvement Loops & Quality Gates
- **Status**: `READY`
- **Location**: [`src/lib/agent/orchestrator.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/orchestrator.ts) & [`src/lib/agent/planner.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/agent/planner.ts)
- **Test Command**: `npm test tests/unit/agent-orchestrator.test.ts`
- **What it does**: Autonomous, end-to-end task execution pipeline. Breaks tasks into structured plans with dependency cycles checked and topologically sorted. Enforces configurable quality gates (`QualityGateSuite`) distinguishing required vs. optional gates. Feeds concrete error outputs into evidence-based bounded correction loops (`maxCorrections`) without repeatedly rewriting working code. Protects destructive actions with mandatory human approval gates (`requestApproval`). Emits structured completion reports detailing acceptance criteria and remaining blockers.

### 4.7 Modular Integration Framework & Open-Source Adapters
- **Status**: `READY`
- **Location**: [`src/lib/integrations/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/integrations/) & [`docs/INTEGRATION-GUIDE.md`](file:///c:/Users/rspma/Downloads/Hackathon-starter/docs/INTEGRATION-GUIDE.md)
- **Test Command**: `npm test tests/unit/integration-registry.test.ts`
- **What it does**: Lightweight, interchangeable adapter registry linking optional advanced capabilities using proven open-source architectures:
  - **RAG & Retrieval**: In-memory text chunker and semantic cosine similarity engine modeled after **LlamaIndex** (`rag:in-memory`).
  - **Web Search**: Agent search adapter modeled after **Tavily** (`search:mock` & `search:tavily`).
  - **Background Queues**: Zero-dependency priority job queue modeled after **BullMQ** (`queue:in-memory`).
  - **OCR & Document Parsing**: Structured OCR extraction adapter modeled after **PaddleOCR** (`ocr:mock` & `ocr:http`).
  - **Speech Recognition**: Speech-to-text transcript adapter modeled after **Faster-Whisper** (`speech:mock` & `speech:whisper`).
  - **AI Vision & Multimodal**: Multimodal captioning and visual QA adapter modeled after **Hugging Face Transformers** (`vision:mock` & `vision:huggingface`).
  - **Document Understanding**: Structured section/table parser modeled after **RAGFlow** (`doc_understanding:mock` & `doc_understanding:ragflow`).
  - Enforces Zod schema argument validation, execution timeouts via `Promise.race`, cancellation via `AbortSignal`, normalized error codes (`NOT_CONFIGURED`, `NOT_REGISTERED`, `TIMEOUT`, `CANCELLED`), and zero-crash missing configuration fallbacks.

### 4.8 Reusable RAG & Document Intelligence Toolkit
- **Status**: `READY`
- **Location**: [`src/lib/rag/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/rag/) (`chunking.ts`, `embeddings.ts`, `store.ts`, `pipeline.ts`)
- **Test Command**: `npm test tests/unit/rag-toolkit.test.ts`
- **What it does**: Comprehensive, modular RAG toolkit combining patterns from **LlamaIndex**, **RAGFlow**, **LangChain.js**, and **Chroma**:
  - **Document Ingestion & Chunking**: Sliding-window word chunker (`chunkByWord`), recursive text splitter (`chunkRecursive`), and markdown section splitter (`chunkMarkdown`) with metadata and header preservation.
  - **Vector Math & Embeddings**: Cosine similarity, dot product, vector normalization, and deterministic in-memory embedding generator (`DeterministicHashEmbeddingProvider`) for 100% offline testing, plus optional OpenAI embeddings adapter (`OpenAIEmbeddingProvider`).
  - **InMemoryVectorStore & Hybrid Search**: Dense vector cosine similarity blended with sparse keyword token overlap via configurable alpha weighting (`mode: 'hybrid' | 'vector' | 'keyword'`), score thresholding, and metadata attribute filtering.
  - **Source-Grounded QA Pipeline**: `queryRAG()` formats retrieved context with numbered citations `[1]`, `[2]`, enforces strict source grounding to prevent hallucination when evidence is missing, and queries the unified AI client.

### 4.9 Reusable Speech & Voice Toolkit
- **Status**: `READY`
- **Location**: [`src/lib/speech/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/speech/) (`stt.ts`, `tts.ts`, `pipeline.ts`), [`src/hooks/use-audio-recorder.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/hooks/use-audio-recorder.ts)
- **Test Command**: `npm test tests/unit/speech-toolkit.test.ts tests/components/audio-recorder.test.tsx`
- **What it does**: Provider-neutral speech processing and interactive voice system inspired by **Faster Whisper**, **OpenAI Whisper**, **Transformers.js**, **Kokoro**, and **Piper**:
  - **Speech-to-Text (STT)**: Provider-neutral transcription engine (`transcribeAudio`) supporting `mock` (deterministic timestamped segments), local/remote `whisper-service`, `openai` Whisper, and `groq` Whisper. Enforces format validation (`wav`, `mp3`, `ogg`, `webm`, `m4a`, `flac`), size boundaries (max 25MB), empty audio checks, timeouts, and cancellation.
  - **Text-to-Speech (TTS)**: Multi-provider speech synthesis (`synthesizeSpeech`) supporting `mock` (clean audio chime + duration calculation), `openai` TTS, `elevenlabs`, `kokoro-service`, and `piper-service`. Validates character limits (max 4,096 chars) and returns normalized base64 or audio URLs.
  - **Composable Voice Pipeline**: `runVoicePipeline()` chains `Audio Input -> STT -> AI Processing -> TTS Synthesis` with stage error isolation (downstream TTS failures do not discard upstream transcripts or response text).
### 4.10 Reusable OCR & Multimodal Vision Toolkit
- **Status**: `READY`
- **Location**: [`src/lib/vision/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/vision/) (`ocr.ts`, `vision-ai.ts`, `preprocessing.ts`, `pipeline.ts`, `types.ts`, `index.ts`)
- **Test Command**: `npm test tests/unit/ocr-vision-toolkit.test.ts`
- **What it does**: Provider-neutral OCR and multimodal computer vision toolkit inspired by **PaddleOCR**, **Tesseract OCR**, **Transformers.js**, **OpenCV**, **Docling**, and **Marker**:
  - **OCR Engine (`executeOCR`)**: Provider-neutral optical character recognition supporting `mock` (deterministic text, line/word coordinates `{ x, y, width, height }`, confidence scores), remote `paddle`, `tesseract-service`, and `cloud` endpoints. Enforces input normalization, configurable language/preprocessing, timeouts, and `AbortSignal` cancellation.
  - **Image Preprocessing & Bounds (`validateAndPreprocessImage`)**: Pure TypeScript binary magic-byte detection (PNG, JPEG, WebP, GIF, PDF), rotation normalization (0, 90, 180, 270 degrees), aspect-ratio scaling limits (max 8192px), file size limits (max 20MB), and grayscale/contrast options without heavy native C++ or OpenCV binaries.
  - **Multimodal AI Vision (`processVisionRequest`)**: Integrated with the unified AI client for visual captioning (`describe`), Visual Question Answering (`vqa`), visual summarization (`summarize`), and structured JSON extraction (`extract`) validated against Zod schemas. Explicitly checks `isVisionSupported()` and returns `PROVIDER_DOES_NOT_SUPPORT_VISION` for text-only models (like Groq) rather than silently failing. Supports up to 5 images per request.
  - **Document Extraction Pipeline (`extractDocument`)**: Composable pipeline normalizing image and PDF inputs into structured page representations (`OCRPage[]`) with metadata, page numbers, and lines.
  - **RAG Bridge Adapter (`toRAGDocuments`)**: Converts extracted OCR pages directly into RAG `Document[]` items, seamlessly piping scanned documents and images into Part 4.2's chunking (`splitDocuments`) and vector search (`InMemoryVectorStore`).

### 4.11 Reusable Web Search & External Data Toolkit
- **Status**: `READY`
- **Location**: [`src/lib/search/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/search/) (`providers.ts`, `fetcher.ts`, `security.ts`, `grounded-qa.ts`, `cache.ts`, `tools.ts`, `types.ts`, `index.ts`)
- **Test Command**: `npm test tests/unit/search-toolkit.test.ts`
- **What it does**: Provider-neutral web search, safe webpage retrieval, and citation-grounded question answering inspired by **Tavily JS**, **Exa JS**, **Firecrawl**, and **LangChain.js**:
  - **Provider-Neutral Search Engine (`executeSearch`)**: Unified search abstraction supporting `mock` (deterministic local dataset with recency and domain filters), `tavily` (`TAVILY_API_KEY`), `exa` (`EXA_API_KEY`), and custom provider functions. Returns normalized items (`title`, `url`, `snippet`, `source`, `score`, `publishedDate`).
  - **Anti-SSRF Security & Guardrails (`validateSafeUrl`, `isRestrictedUrl`)**: Rejects loopback (`127.0.0.1`, `localhost`, `::1`), private subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), cloud instance metadata endpoints (`169.254.169.254`, `metadata.google.internal`), and non-HTTP protocols. Re-validates post-redirect target URLs to prevent open redirect SSRF attacks.
  - **Safe Webpage Fetcher & Boilerplate Stripper (`fetchWebpage`, `extractPageContent`)**: Retrieves external URLs safely, validates Content-Type (HTML/text), enforces size limits (max 5MB) and timeout limits (10s), extracts metadata (`title`, `description`, `canonicalUrl`), and strips HTML boilerplate (`<nav>`, `<header>`, `<footer>`, `<script>`, `<style>`, `<svg>`, `<aside>`).
  - **Prompt Injection Defense (`formatUntrustedWebContent`)**: Enforces strict boundary encapsulation around all external web content so models treat retrieved web text strictly as untrusted evidence rather than executable developer instructions.
  - **Source-Grounded QA & Citations (`synthesizeGroundedAnswer`)**: Bounded multi-step research pipeline formatting retrieved evidence with numbered citations `[1]`, `[2]`. Evaluates source factual support and returns an explicit insufficient-evidence response (`hasSufficientEvidence: false`) if evidence does not substantiate claims.
  - **Agent Tool Registry Integration (`registerWebTools`)**: Ready-to-mount agent tools for `ToolRegistry`: `web_search`, `fetch_webpage`, and `extract_page_content`, all annotated `isReadOnly: true` with strict Zod validation.
  - **In-Memory Cache (`SearchCache`)**: TTL-based cache preventing redundant requests and reducing paid API consumption during agent loops.

### 4.12 Reusable Database, Storage & Caching Toolkit
- **Status**: `READY`
- **Location**:
  - Database: [`src/lib/database/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/database/) (`types.ts`, `config.ts`, `in-memory.ts`, `migrations.ts`, `index.ts`)
  - Storage: [`src/lib/storage/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/storage/) (`types.ts`, `security.ts`, `local.ts`, `supabase.ts`, `index.ts`)
  - Cache: [`src/lib/cache/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/cache/) (`types.ts`, `in-memory.ts`, `redis.ts`, `index.ts`)
- **Test Command**: `npm test tests/unit/database-storage-cache.test.ts`
- **What it does**: Provider-neutral data persistence, file storage, and caching layer inspired by **Prisma**, **Drizzle ORM**, **Supabase JS**, **Redis**, and **MinIO**:
  - **Database Abstraction**:
    - Centralized environment configuration (`getDatabaseConfig`) with safe credential masking (`maskDatabaseUrl`) so raw passwords never appear in diagnostics or logs.
    - Non-crashing health checks (`checkDatabaseHealth`) inspecting connectivity and returning status (`healthy`, `degraded`), latency ms, and active connection metadata.
    - Typed generic repository interface (`IRepository<T>`) supporting `findById`, `find` (filtering, sorting, offset/limit pagination), `create`, `update`, `delete`, and `count`.
    - `InMemoryDatabaseAdapter`: High-performance, offline database simulation with atomic snapshot transaction rollback. If an operation throws inside a transaction block or `tx.rollback()` is invoked, all collections automatically revert to their pre-transaction state.
    - SQL Schema Migrations (`MigrationManager`, `STANDARD_MIGRATIONS`): Starter PostgreSQL schemas for users, projects, and Row-Level Security (RLS) policies.
  - **File Storage Toolkit & Security**:
    - Provider-neutral storage contract (`IFileStorageAdapter`) with metadata indexing (`StoredFileMetadata`).
    - Anti-directory traversal guard (`sanitizeStoragePath`): Blocks `../`, `..\`, null bytes, illegal control characters, and Windows drive/UNC absolute paths.
    - Safe collision-resistant filename generator (`generateSafeStoragePath`) formatting paths as `[prefix]/[timestamp]_[random8]_[sanitizedName]`.
    - Upload safety validator (`validateStorageFile`): Enforces file size limits and blocks dangerous executable extensions (`.exe`, `.sh`, `.bat`, `.php`, etc.).
    - Access authorization checks (`verifyStorageAccess`): Public files readable by anyone; private files require user ownership or admin role.
    - `LocalStorageAdapter`: Zero-dependency, in-memory Buffer storage with prefix search and HMAC-signed time-bounded URLs.
    - `SupabaseStorageAdapter`: Production adapter bridging into Supabase Storage buckets with graceful fallback when unconfigured.
  - **Resilient Caching Layer**:
    - Standard caching contract (`ICache`): `get`, `set`, `delete`, `has`, `clear`, and `getStats`.
    - Resilient fallback (`getOrSet`): Cache failures or timeouts never crash application flows; queries cleanly fall back to the underlying data source.
    - `InMemoryCache`: TTL expiration and capacity limit eviction (LRU-style oldest key eviction) for offline development.
    - Key namespacing (`cache.namespace('projects')`): Prevents key collisions across domains.
    - `RedisCacheAdapter`: HTTP/REST Redis client (Upstash / Redis Cloud) executing via native `fetch` with seamless in-memory fallback.

### 4.13 Reusable Maps, Geolocation & Routing Toolkit
- **Status**: `READY`
- **Location**:
  - Library: [`src/lib/geo/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/geo/) (`types.ts`, `math.ts`, `geolocation.ts`, `geocoding.ts`, `routing.ts`, `nearby.ts`, `index.ts`)
  - Components: [`src/components/geo/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/geo/) (`interactive-map.tsx`, `location-picker.tsx`, `index.ts`)
- **Test Command**: `npm test tests/unit/maps-geospatial-toolkit.test.ts tests/components/map-components.test.tsx`
- **What it does**: Provider-neutral mapping, browser geolocation, address geocoding, distance math, route calculations, and nearby search inspired by **Leaflet**, **MapLibre GL JS**, **OSRM**, and **Turf.js**:
  - **Geospatial Math & Validation (`math.ts`)**:
    - WGS84 coordinate boundary validation (`isValidCoordinates`): Validates numeric bounds ($-90 \le \text{lat} \le 90$, $-180 \le \text{lng} \le 180$, finite).
    - Haversine distance calculator (`calculateDistance`): Great-circle distance calculations in meters, kilometers, or miles.
    - Initial compass bearing (`calculateBearing`) and destination projection (`destinationPoint`).
    - Bounding box calculator (`calculateBoundingBox`, `isPointInBoundingBox`) for multi-location view fitting.
    - Formatting helpers: `formatCoordinates`, `formatDistance`, `formatDuration`.
  - **Privacy-Respecting Browser Geolocation (`geolocation.ts`)**:
    - `requestGeolocation(options)`: Explicit user-action location acquisition. Never requests coordinates silently. Normalizes errors (`PERMISSION_DENIED`, `POSITION_UNAVAILABLE`, `TIMEOUT`, `NOT_SUPPORTED`).
    - `watchGeolocation`: Real-time location stream subscriber with unmount cleanup handler.
  - **Geocoding Abstraction (`geocoding.ts`)**:
    - `IGeocodingProvider`: Forward geocoding (`geocode`) and reverse geocoding (`reverseGeocode`).
    - `MockGeocodingProvider`: Offline deterministic database of global tech hubs and cities.
    - `NominatimGeocodingProvider`: OpenStreetMap Nominatim integration adhering to OSM rate limits and usage policies.
  - **Routing Abstraction (`routing.ts`)**:
    - `IRoutingProvider`: Route calculations supporting `driving`, `walking`, and `cycling` modes.
    - `MockRoutingProvider`: Offline route calculator generating realistic distance, speed-dependent duration, turn-by-turn steps, and curved polyline coordinates.
    - `OSRMRoutingProvider`: Open Source Routing Machine integration with graceful fallback on network timeout.
  - **Nearby Place Discovery (`nearby.ts`)**:
    - `INearbySearchProvider`: Proximity search for categorized amenities (restaurants, cafes, hospitals, transit, etc.).
    - `MockNearbySearchProvider` & `OverpassNearbySearchProvider` (OSM Overpass API).
  - **Interactive Map Components (`interactive-map.tsx`, `location-picker.tsx`)**:
    - `<InteractiveMap />`: 100% SSR-safe Next.js 16 App Router map with Web Mercator projection, interactive zoom/pan controls, marker pins with popup dialogs, route polyline overlays, click-to-pin coordinate selection, loading skeletons, and error retry states.
    - `<LocationPicker />`: Composable location selector with address search, "Use My Location" explicit button, and interactive map preview.

### 4.14 Reusable Payments & Webhook Toolkit
- **Status**: `READY`
- **Location**: [`src/lib/payments/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/payments/) (`types.ts`, `validation.ts`, `security.ts`, `idempotency.ts`, `mock.ts`, `stripe.ts`, `webhook-handler.ts`, `index.ts`)
- **Test Command**: `npm test tests/unit/payments-webhook-toolkit.test.ts`
- **What it does**: Provider-neutral payments, checkout sessions, cryptographic webhook verification, and idempotent event processing inspired by **Stripe**, **Razorpay**, **Svix**, and **Standard Webhooks**:
  - **Payment Validation & Formatting (`validation.ts`)**:
    - Amount validation (`validatePaymentAmount`): Enforces positive integers in minor currency units (cents/paise), rejecting floating-point, zero, negative, or overflow values.
    - ISO-4217 Currency validation (`validateCurrency`): Normalizes 3-letter currency codes (USD, EUR, GBP, INR, JPY, etc.).
    - Reference ID validation (`validateReferenceId`): Validates and sanitizes application-owned order identifiers (`order_123`, `booking_abc`).
    - Monetary formatter (`formatCurrencyAmount`): Handles zero-decimal currencies (JPY) and standard two-decimal currencies cleanly.
  - **Payment Providers (`IPaymentProvider`)**:
    - `MockPaymentProvider`: 100% offline payment simulator creating checkout sessions, tracking lifecycle status transitions (`pending`, `succeeded`, `failed`, `cancelled`), and generating mock webhook events.
    - `StripePaymentProvider`: Zero-SDK REST client for creating Stripe Checkout Sessions and querying Payment status with seamless offline fallback when unconfigured.
  - **Cryptographic Webhook Verification (`security.ts`)**:
    - Constant-time comparison (`timingSafeEqualStrings`): Prevents timing side-channel attacks during signature verification.
    - Stripe signature verifier (`verifyStripeSignature`): Extracts timestamp and `v1` signatures, enforces tolerance windows (anti-replay defense), computes HMAC-SHA256, and verifies raw payload.
    - Standard HMAC-SHA256 verifier (`verifyHmacSha256Signature`) and Svix/Standard Webhook verifier (`verifyStandardWebhookSignature`).
    - Signature test generator (`generateStripeSignature`).
  - **Idempotency & Webhook Processing (`webhook-handler.ts`, `idempotency.ts`)**:
    - `InMemoryIdempotencyStore`: Tracks processed event IDs with TTL expiration, deduplicating retry storms.
    - `IdempotentWebhookHandler`: Dispatches verified events to specific listeners (`on('checkout.session.completed', ...)`) and wildcard listeners (`on('*', ...)`), returning structured outcomes (`processed`, `duplicate`, `unsupported`, `failed`).
    - Security Directive: Never treats frontend redirects (`/success?session_id=...`) as proof of payment; only server-verified webhooks or direct backend status inquiries establish finality.

### 4.15 Reusable Background Jobs & Workflow Toolkit
- **Status**: `READY`
- **Location**: [`src/lib/jobs/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/jobs/) (`types.ts`, `queue.ts`, `scheduler.ts`, `workflow.ts`, `index.ts`)
- **Test Command**: `npm test tests/unit/jobs-workflow-toolkit.test.ts`
- **What it does**: Provider-neutral background job processing, multi-step workflow pipelines, execution retries, and recurring job scheduling inspired by **BullMQ**, **Inngest**, **Temporal**, and **Trigger.dev**:
  - **Local Job Queue (`LocalJobQueue`, `sharedJobQueue`)**:
    - Provider-neutral `IJobQueue` interface supporting typed payloads, results, priority ordering, and configurable concurrency limits.
    - Automatic retries with configurable limits and backoff strategies (`fixed` or `exponential`).
    - Non-idempotent operation safeguards: Safely refuses automatic retries on non-idempotent tasks (e.g. billing, outbound notifications) unless explicitly enabled with `nonIdempotentSafe: true`.
    - Submission deduplication: `idempotencyKey` prevents duplicate job creation across rapid submissions or retries.
    - Execution timeouts enforced via `AbortController` and `Promise.race`.
    - Progress telemetry updates (`job.progress` 0-100%) and typed pub-sub event listeners (`job:queued`, `job:started`, `job:progress`, `job:completed`, `job:failed`, `job:cancelled`).
    - Graceful worker draining and shutdown (`stop(drainTimeoutMs)`).
  - **Composable Multi-Step Workflow Engine (`JobWorkflowEngine`, `JobWorkflowBuilder`)**:
    - Composable step pipelines (`Validate input -> Process data -> Call AI -> Verify result -> Save output`).
    - Conditional branching and step skips (`branch`, `condition`).
    - Checkpoint persistence and resumability integrating directly with `src/lib/agent/checkpoint.ts` (`WorkflowCheckpoint`, `InMemoryCheckpointStorage`): Skips already completed steps upon workflow replay.
    - Side-effect tracking (`uncertainStepId`): Detects and flags mutating actions in-flight to prevent duplicate external writes.
    - Step-level timeouts and retries with real-time progress calculation.
  - **Recurring Job Scheduler (`JobScheduler`, `sharedJobScheduler`)**:
    - Recurring interval jobs (`intervalMs`) and standard 5-part cron patterns (`computeNextCronRun`).
    - Schedule deduplication preventing duplicate registration of conflicting task IDs.
    - Pause, resume, and automated dispatch into any `IJobQueue` target.
  - **Zero-Dependency Local Architecture**: Runs 100% offline without Redis, Docker, or external workers during development and testing.

---

## 5. UI Patterns & Presentation

### 5.1 Reusable UI State Views
- **Status**: `READY`
- **Location**: [`src/components/ui/state-views.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/state-views.tsx)
- **Test Command**: `npm test tests/components/state-views.test.tsx`
- **What it does**: Ready-to-use, accessible state panels: `<LoadingState />`, `<EmptyState />`, `<ErrorState />`, and `<SuccessState />`.

### 5.2 Accessible Form Controls & Inputs
- **Status**: `READY`
- **Location**: [`src/components/ui/form-controls.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/form-controls.tsx) & [`src/components/ui/input.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/input.tsx)
- **Test Command**: `npm test tests/components/ui-library.test.tsx`
- **What it does**: Accessible primitives for `<Textarea>`, `<Select>`, `<Checkbox>`, `<RadioGroup>`, `<Switch>`, and `<FormField>`. Supports keyboard interaction, visible focus rings, inline error messaging (`aria-invalid`, `aria-describedby`), and screen reader hints.

### 5.3 Accessible Dialogs & Confirmation Modals
- **Status**: `READY`
- **Location**: [`src/components/ui/dialog.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/dialog.tsx)
- **Test Command**: `npm test tests/components/ui-library.test.tsx`
- **What it does**: Focus-trapping modal dialogs (`Dialog`, `ConfirmDialog`) with backdrop blur, `Escape` key listeners, scroll locking, and accessible `aria-modal` attributes.

### 5.4 Toast Notification System
- **Status**: `READY`
- **Location**: [`src/components/ui/toast.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/toast.tsx)
- **Test Command**: `npm test tests/components/ui-library.test.tsx`
- **What it does**: Global notification system via `<ToastProvider>` and `useToast()` hook. Supports 4 notification variants (`info`, `success`, `warning`, `error`), auto-dismiss timers, manual dismiss buttons, and accessible `role="status"` region announcements.

### 5.5 Loading Shimmer & Spinner Primitives
- **Status**: `READY`
- **Location**: [`src/components/ui/skeleton.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/skeleton.tsx)
- **Test Command**: `npm test tests/components/ui-library.test.tsx`
- **What it does**: Shimmer `<Skeleton>` placeholder and SVG `<Spinner>` with size options (`sm`, `md`, `lg`), accessible `role="status"`, and `motion-reduce` compliance.

### 5.6 Data-Focused Components (Table, Search, Pagination, Upload)
- **Status**: `READY`
- **Location**: [`src/components/ui/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/) (`table.tsx`, `search-input.tsx`, `pagination.tsx`, `file-upload.tsx`)
- **Test Command**: `npm test tests/components/ui-library.test.tsx`
- **What it does**:
  - `<DataTable>`: Sortable columns (clickable headers with sort direction indicators and `aria-sort`), client-side filtering, and integrated loading/empty/error states.
  - `<SearchInput>`: Debounced search bar with clear button and keyboard handling.
  - `<Pagination>`: Accessible page navigation with ellipsis, previous/next controls, and `aria-current="page"`.
  - `<FileUpload>`: Drag & drop upload area with client-side validation (max file size, allowed extensions), progress reporting when supported, clear button, and accessible error alerts. Does not fabricate fake uploads.

### 5.7 Reusable Application Layouts & Page Shells
- **Status**: `READY`
- **Location**: [`src/components/layout/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/layout/) (`app-shell.tsx`, `page-header.tsx`, `navbar.tsx`, `footer.tsx`, `dashboard-shell.tsx`)
- **Test Command**: `npm test tests/components/layout-templates.test.tsx`
- **What it does**: Composable, accessible layouts designed for rapid customization in any hackathon project:
  - `<AppShell>`: Base multi-slot application wrapper (header, sidebar, main, footer).
  - `<SidebarLayout>`: Responsive desktop sidebar + mobile slide-out drawer with backdrop blur, keyboard `Escape` closing listener, body scroll lock, accessible navigation landmarks (`role="navigation"`, `aria-label`), and user session indicator.
  - `<TopNavLayout>`: Streamlined top navigation shell for simpler tools, utilities, or docs with responsive mobile hamburger toggle.
  - `<DashboardLayout>`: High-level dashboard shell composing the sidebar with `<PageHeader>`, breadcrumbs, and content regions.
  - `<SettingsLayout>`: Multi-section settings layout featuring vertical section navigation tabs and content panel.
  - `<AuthLayout>`: Centered, distraction-free authentication layout for login, register, and password reset flows with brand logo and back navigation.
  - `<MarketingLayout>`: Landing and public marketing shell with announcement banner, navigation, hero container, and footer.
  - `<PageHeader>`: Standardized page header with title, subtitle, breadcrumbs (`aria-label="Breadcrumb"`), back link, badge slot, and action button bar.

### 5.8 Reusable Page Templates
- **Status**: `READY`
- **Location**: [`src/components/templates/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/templates/)
- **Test Command**: `npm test tests/components/layout-templates.test.tsx`
- **What it does**: Clean, unopinionated page templates ready to drop into any route:
  - `<DashboardOverviewTemplate>`: Metrics/KPI card grid with positive/negative trend badges, quick action toolbar, main data views, and secondary activity/sidebar slot.
  - `<ListPageTemplate>`: Searchable and filterable data list with debounced search input, action triggers, integrated `<PageSkeletonState>`, `<EmptyState>`, error retry, and pagination.
  - `<DetailPageTemplate>`: Entity inspection view with back button, status badges, horizontal tab navigation, main content, and metadata/property sidebar.
  - `<FormPageTemplate>`: Card-based creation and editing template with form validation error/success alerts, submitting spinner button, cancel callback, and unsaved changes banner.
  - `<SettingsPageTemplate>`: Multi-panel configuration template with vertical section sidebar and active panel switcher.
  - `<SearchResultsTemplate>`: Search interface with query summary ("Showing 12 results for..."), sorting dropdown, filters slot, empty state handling, and pagination.
  - `<MultiStepWorkflowTemplate>`: Multi-step stepper with numbered step indicators, progress tracker (`aria-current="step"`), step content slot, and Previous/Continue/Complete actions with submitting spinner.
  - `<AuthPageTemplate>`: Auth form wrapper integrating `<AuthLayout>`, title, error/success banners, and alternative navigation links.

### 5.9 Page-Level States & Warnings
- **Status**: `READY`
- **Location**: [`src/components/ui/state-views.tsx`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/components/ui/state-views.tsx)
- **Test Command**: `npm test tests/components/layout-templates.test.tsx`
- **What it does**: Standardized, accessible page-level state views:
  - `<PermissionDeniedState>`: 403 access denied view with shield icon, explanation, and action button.
  - `<NotFoundState>`: 404 item or page missing view with icon, explanation, and return CTA.
  - `<PageSkeletonState>`: High-fidelity layout skeleton mimicking page header, metric cards, and content blocks during loading.
  - `<UnsavedChangesBanner>`: Alert bar warning users of pending changes with Discard and Save Changes actions.

### 5.10 Reusable Frontend Data Layer & Async State Hooks
- **Status**: `READY`
- **Location**: [`src/hooks/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/hooks/) (`use-query.ts`, `use-mutation.ts`, `use-pagination.ts`, `index.ts`), [`src/lib/data/cache.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/data/cache.ts), and [`src/lib/api/client.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/api/client.ts)
- **Test Command**: `npm test tests/components/frontend-data-layer.test.tsx`
- **What it does**: Composable, lightweight, dependency-free async data fetching, caching, and state management:
  - `useQuery(key, fetcher, options)`: Asynchronous data fetching with in-memory caching (`QueryCache`), TTL and stale-time freshness checking, loading/fetching/success/error/empty flags, manual refetch, local `setData`, automatic retry for transient errors, and sequence-based stale-response protection that prevents slow out-of-order responses from overwriting newer user actions.
  - `useMutation(mutationFn, options)`: Mutation hook supporting optimistic updates via `onMutate` returning rollback snapshots, automatic rollback restoration on failure, automatic cache invalidation (`invalidateKeys`), and lifecycle callbacks (`onSuccess`, `onError`, `onSettled`).
  - `usePagination(options)`: Client-side pagination state controller with page clamping, page boundaries (`canNext`, `canPrev`), and zero-overhead array slicing (`sliceData`).
  - `useInfiniteQuery(fetchPage, options)`: Infinite scrolling accumulator aggregating multi-page records across sequential page fetches with `hasMore` and reset support.
  - `useDebouncedValue(value, delayMs)`: Debounce hook for responsive search queries and filter updates.
  - `createApiClient(config)`: Configurable API client instance factory supporting baseUrl, query params serialization, typed responses (`json`, `text`, `blob`, `formData`, `arrayBuffer`), structured error codes (`HTTP_ERROR`, `TIMEOUT`, `ABORTED`, `NETWORK_ERROR`, `PARSE_ERROR`, `VALIDATION_ERROR`), signal combination (merging user `AbortSignal` with timeout controller), dynamic token resolution without credential logging, and in-flight request deduplication.

### 5.11 Real-Time Communication: WebSocket & SSE Stream Consumer
- **Status**: `READY`
- **Location**: [`src/lib/realtime/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/realtime/) (`websocket.ts`, `sse.ts`, `index.ts`) & [`src/hooks/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/hooks/) (`use-websocket.ts`, `use-realtime-stream.ts`)
- **Test Command**: `npm test tests/components/realtime.test.tsx`
- **What it does**: Universal, zero-external-dependency real-time communication infrastructure for live dashboards, AI token streaming, collaborative tools, sensor telemetry, and background job notifications:
  - `WebSocketClient`: Type-safe, event-driven WebSocket manager with explicit lifecycle states (`connecting`, `open`, `closing`, `closed`), automatic JSON deserialization, bounded offline message queuing, automated ping/pong heartbeats detecting dead sockets, configurable exponential backoff with random jitter, and permanent closure detection (e.g. 1008 policy violation, 4401 unauthorized, 4403 forbidden) preventing infinite retry storms.
  - `parseSSEChunk(chunk)`: High-performance, W3C-compliant Server-Sent Events parser preserving trailing token whitespace for natural language model generation while stripping protocol prefix markers.
  - `consumeSSE(url, options)`: Streaming HTTP reader using native `fetch` and `ReadableStreamDefaultReader` supporting custom headers, dynamic authentication token resolution (without logging secrets or exposing tokens in URL parameters), cancellation via `AbortSignal`, raw and JSON-parsed event dispatch, and OpenAI/Anthropic standard `[DONE]` signal termination.
  - `useWebSocket(url, options)`: Ergonomic React hook providing live connection status flags (`status`, `isConnected`), message history (`lastMessage`), manual controls (`send`, `connect`, `disconnect`, `reconnect`), typed message subscription handlers, and React 19-compliant unmount lifecycle cleanup.
  - `useRealtimeStream(options)`: React hook tailored for consuming continuous AI token generation or live server telemetry streams, accumulating streamed text with start, abort, and reset triggers.

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
