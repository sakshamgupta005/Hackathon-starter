# Modular Integration Framework & Open-Source References

This guide documents the **Modular Integration Framework** for the Hackathon Starter, designed to integrate specialized AI and infrastructure capabilities through clean, interchangeable adapters.

Following the skeleton-first philosophy:
> **The starter serves the future product. The future product does not serve the starter.**
> All integrations are strictly optional, dependency-isolated, and accompanied by zero-cost mock/in-memory implementations so hackathon teams can build and test offline without paid API keys, GPU hardware, or external databases.

---

## Architecture Overview

The integration layer resides in [`src/lib/integrations/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/integrations/):
- [`types.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/integrations/types.ts): Standard TypeScript contracts, capability categories, and normalized error models (`NOT_CONFIGURED`, `NOT_REGISTERED`, `TIMEOUT`, `CANCELLED`, `INVALID_INPUT`).
- [`registry.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/integrations/registry.ts): `IntegrationRegistry` coordinating registration, category indexing, lazy adapter initialization, timeout enforcement, `AbortSignal` cancellation, and zero-exception execution.
- [`adapters/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/integrations/adapters/): Thin adapters matching each capability category with both in-memory/mock and remote HTTP implementations.
- [`index.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/integrations/index.ts): Central barrel and `getIntegrationRegistry()` preloaded with default capabilities.

```typescript
import { getIntegrationRegistry } from '@/lib/integrations'

const registry = getIntegrationRegistry()

// Execute capability safely — never throws uncaught exceptions
const result = await registry.execute('search:mock', {
  query: 'Next.js 16 App Router',
  maxResults: 3,
})

if (result.success) {
  console.log(result.data.results)
} else {
  console.warn(result.errorDetail?.code, result.error)
}
```

---

## Capability Reference Catalogue

### 1. RAG & Document Retrieval
- **Status**: `READY` (In-memory engine implemented; external vector DB adapters pluggable)
- **Reference Repository**: [`run-llama/llama_index`](https://github.com/run-llama/llama_index) (and `LlamaIndexTS`)
- **License**: MIT
- **What it enables**: Sliding-window text chunking, document indexing, and semantic similarity search for context injection into LLM prompts.
- **Required Environment Variables**: None for in-memory mode. (Optional: `PINECONE_API_KEY` or Supabase pgvector if persisting embeddings).
- **Optional Dependencies**: `@llamaindex/core` (if advanced graph indexing or node parsers are needed).
- **How to enable & use**:
  ```typescript
  import { sharedInMemoryRAGIndex, getIntegrationRegistry } from '@/lib/integrations'

  // 1. Index documents in-memory
  sharedInMemoryRAGIndex.addDocuments({
    documents: [{ id: 'doc-1', text: 'Supabase provides real-time postgres subscriptions.' }],
    chunkSize: 150,
    chunkOverlap: 25,
  })

  // 2. Query through registry
  const result = await getIntegrationRegistry().execute('rag:in-memory', {
    query: 'postgres subscriptions',
    topK: 3,
  })
  ```
- **Local / Mock Alternative**: `rag:in-memory` provides zero-dependency word-frequency & token-overlap scoring.
- **Limitations & Licensing**: In-memory storage is ephemeral and cleared on process restart. MIT license allows unrestricted commercial and hackathon reuse.

---

### 2. Advanced Document Understanding & Structural Parsing
- **Status**: `READY` (Mock parser implemented; RAGFlow HTTP adapter ready)
- **Reference Repository**: [`infiniflow/ragflow`](https://github.com/infiniflow/ragflow)
- **License**: Apache-2.0
- **What it enables**: Deep document parsing, template/layout analysis, section extraction, and structured tabular data extraction from PDFs and documents.
- **Required Environment Variables**: `RAGFLOW_SERVICE_URL` and optional `RAGFLOW_API_KEY`.
- **Optional Dependencies**: None (communicates via native `fetch`).
- **How to enable & use**:
  ```typescript
  // Uses doc_understanding:mock in development, or doc_understanding:ragflow in production
  const result = await registry.execute('doc_understanding:mock', {
    documentUrl: 'https://example.com/quarterly-report.pdf',
    extractTables: true,
  })
  ```
- **Local / Mock Alternative**: `doc_understanding:mock` returns pre-structured sections and tables for layout verification.
- **Limitations & Licensing**: Deep OCR-based layout analysis requires deploying RAGFlow's Docker stack if real PDF rendering is required. Apache-2.0 license permits redistribution and modification with notice preservation.

---

### 3. OCR & Document Intelligence Toolkit
- **Status**: `READY` (Full toolkit implemented in [`src/lib/vision/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/vision/))
- **Reference Repositories**:
  - [`PaddlePaddle/PaddleOCR`](https://github.com/PaddlePaddle/PaddleOCR) (Apache-2.0): Text detection, multilingual recognition, table and layout parsing.
  - [`tesseract-ocr/tesseract`](https://github.com/tesseract-ocr/tesseract) (Apache-2.0): Established local/containerized OCR engine.
  - [`docling-project/docling`](https://github.com/docling-project/docling) (MIT): Advanced document conversion and structural chunking.
  - [`datalab-to/marker`](https://github.com/datalab-to/marker) (GPL-3.0 / PolyForm): High-accuracy PDF to markdown conversion.
  - [`opencv/opencv`](https://github.com/opencv/opencv) (Apache-2.0): Image preprocessing and contrast enhancement patterns.
- **What it enables**: Provider-neutral OCR, bounding box coordinates (`{ x, y, width, height }`), word/line confidence, document extraction, and seamless RAG pipeline bridge adapter.
- **Required Environment Variables**: None for `mock`. Optional `OCR_SERVICE_URL` (PaddleOCR) or `TESSERACT_SERVICE_URL` (Tesseract service).
- **Optional Dependencies**: None in Node.js (uses pure TypeScript byte sniffing and REST payload exchange).
- **How to enable & use**:
  ```typescript
  import { executeOCR, extractDocument, toRAGDocuments } from '@/lib/vision'
  import { splitDocuments, InMemoryVectorStore } from '@/lib/rag'

  // 1. Direct OCR with coordinates and confidence
  const ocr = await executeOCR(
    { base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', mimeType: 'image/png' },
    { provider: 'mock', language: 'en', returnBoundingBoxes: true }
  )

  // 2. Composable Document Extraction
  const doc = await extractDocument(
    { base64: '...', mimeType: 'application/pdf' },
    { ocrProvider: 'mock', maxPages: 10 }
  )

  // 3. Bridge to RAG pipeline (Part 4.2)
  const ragDocs = toRAGDocuments(doc)
  const chunks = splitDocuments(ragDocs, { chunkSize: 200, chunkOverlap: 25 })
  const store = new InMemoryVectorStore()
  await store.addChunks(chunks)
  ```
- **Local / Mock Alternative**: `mock` OCR returns deterministic lines, bounding boxes, and 0.98 confidence scores without network or native dependencies.
- **Limitations & Licensing**: Real PaddleOCR/Tesseract requires a self-hosted microservice or container. Apache-2.0 and MIT licenses permit unrestricted hackathon use.

---

### 4. Speech Recognition & Transcription
- **Status**: `READY` (Mock speech implemented; Faster-Whisper HTTP adapter ready)
- **Reference Repository**: [`SYSTRAN/faster-whisper`](https://github.com/SYSTRAN/faster-whisper)
- **License**: MIT
- **What it enables**: Speech-to-text audio transcription, timestamped segment generation, and language detection.
- **Required Environment Variables**: `WHISPER_SERVICE_URL` (or `OPENAI_API_KEY` / `GROQ_API_KEY` for hosted Whisper).
- **Optional Dependencies**: None (uses REST audio payload exchange).
- **How to enable & use**:
  ```typescript
  import { transcribeAudio, synthesizeSpeech, runVoicePipeline } from '@/lib/speech'

  // 1. Transcribe speech
  const stt = await transcribeAudio({ audioBase64: '...' }, { provider: 'mock' })

  // 2. Synthesize speech
  const tts = await synthesizeSpeech({ text: 'Task completed successfully.' })

  // 3. Composable Voice Pipeline (Audio -> STT -> AI Processing -> TTS)
  const pipeline = await runVoicePipeline({
    audio: { audioBase64: '...' },
    processText: async (prompt) => `Processed: ${prompt}`,
  })
  ```
- **Local / Mock Alternative**: `mock` STT provides instant timestamped transcript segments and `mock` TTS returns immediate playable audio chime data without network requests.
- **Limitations & Licensing**: Local Faster-Whisper, Kokoro, and Piper execution require lightweight external containers or service endpoints (`WHISPER_SERVICE_URL`, `KOKORO_SERVICE_URL`, `PIPER_SERVICE_URL`). MIT and Apache-2.0 licenses permit free commercial use.

---

### 5. AI Vision & Multimodal Understanding
- **Status**: `READY` (Toolkit implemented in [`src/lib/vision/vision-ai.ts`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/vision/vision-ai.ts))
- **Reference Repositories**:
  - [`huggingface/transformers.js`](https://github.com/huggingface/transformers.js) (Apache-2.0): Browser-side and ONNX model runtime reference.
  - [`huggingface/transformers`](https://github.com/huggingface/transformers) (Apache-2.0): Multimodal VQA and visual captioning pipelines.
- **What it enables**: Image description, Visual Question Answering (VQA), visual summarization, and structured information extraction validated against Zod schemas. Supports up to 5 images per request and explicitly verifies provider vision capabilities (`isVisionSupported`).
- **Required Environment Variables**: `OPENAI_API_KEY` or `GEMINI_API_KEY` (None needed for `mock`).
- **Optional Dependencies**: None (uses unified AI client and native fetch).
- **How to enable & use**:
  ```typescript
  import { processVisionRequest, isVisionSupported } from '@/lib/vision'
  import { z } from 'zod'

  // Structured extraction with Zod schema
  const InvoiceSchema = z.object({
    title: z.string(),
    totalAmount: z.number(),
    currency: z.string(),
  })

  const result = await processVisionRequest({
    provider: 'mock', // or 'gemini', 'openai'
    images: [{ base64: '...', mimeType: 'image/jpeg' }],
    task: 'extract',
    schema: InvoiceSchema,
  })

  if (result.success) {
    console.log(result.structuredData) // Typed as z.infer<typeof InvoiceSchema>
  }
  ```
- **Local / Mock Alternative**: `mock` provider generates deterministic descriptions, VQA answers, and valid schema matches without external network or API costs.
- **Limitations & Licensing**: Text-only LLM models (e.g. Groq) return `PROVIDER_DOES_NOT_SUPPORT_VISION`. Cloud vision APIs have per-token/per-image pricing. Apache-2.0 license.

---

### 6. Web Search & External Data Toolkit
- **Status**: `READY` (Full toolkit implemented in [`src/lib/search/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/search/))
- **Reference Repositories**:
  - [`tavily-ai/tavily-js`](https://github.com/tavily-ai/tavily-js) (Apache-2.0): Agentic web search API returning clean snippets and synthesized answers.
  - [`exa-labs/exa-js`](https://github.com/exa-labs/exa-js) (MIT / Apache-2.0): Neural embeddings-based search and link discovery.
  - [`firecrawl/firecrawl`](https://github.com/firecrawl/firecrawl) (AGPL-3.0 / Client MIT): Clean web scraping, markdown conversion, and boilerplate stripping.
  - [`langchain-ai/langchainjs`](https://github.com/langchain-ai/langchainjs) (MIT): Source-grounded document loaders and citation chains.
- **What it enables**: Provider-neutral web search, anti-SSRF URL filtering, HTML boilerplate stripping, traceable citation QA, and drop-in agent tools (`web_search`, `fetch_webpage`, `extract_page_content`).
- **Required Environment Variables**: None for `mock`. `TAVILY_API_KEY` for live Tavily search, `EXA_API_KEY` for live Exa search.
- **Optional Dependencies**: None (uses native `fetch` and pure TypeScript parsing).
- **How to enable & use**:
  ```typescript
  import {
    executeSearch,
    fetchWebpage,
    synthesizeGroundedAnswer,
    registerWebTools
  } from '@/lib/search'
  import { ToolRegistry } from '@/lib/agent/tools'

  // 1. Provider-neutral search
  const search = await executeSearch({
    query: 'Next.js 16 Turbopack',
    provider: 'mock', // or 'tavily', 'exa'
    maxResults: 3,
    includeDomains: ['nextjs.org'],
  })

  // 2. Safe webpage retrieval with anti-SSRF and boilerplate stripping
  const page = await fetchWebpage({
    url: 'https://nextjs.org/docs',
    maxContentLength: 5000,
  })

  // 3. Grounded answer synthesis with traceable citations [1], [2]
  const grounded = await synthesizeGroundedAnswer({
    query: 'What are the main Next.js 16 features?',
    searchOptions: { provider: 'mock' },
  })
  console.log(grounded.answer)
  console.log(grounded.citations) // Array of { sourceIndex, title, url, snippet }

  // 4. Mount agent tools onto ToolRegistry
  const registry = new ToolRegistry()
  registerWebTools(registry, { config: { defaultSearchProvider: 'mock' } })
  ```
- **Local / Mock Alternative**: `mock` search contains a deterministic local dataset with domain, keyword, and recency filtering for 100% offline testing.
- **Limitations & Licensing**: Live web search requires a Tavily or Exa API key. Cloud instance metadata and private subnets are permanently blocked by SSRF defense. Apache-2.0 and MIT licenses permit unrestricted hackathon use.

---

### 7. Background Jobs & Asynchronous Queues
- **Status**: `READY` (In-memory priority queue implemented; BullMQ adapter pattern defined)
- **Reference Repository**: [`taskforcesh/bullmq`](https://github.com/taskforcesh/bullmq)
- **License**: MIT
- **What it enables**: Task queuing, priority scheduling, lifecycle tracking (`waiting`, `active`, `completed`, `failed`), and retry management.
- **Required Environment Variables**: `REDIS_URL` if connecting BullMQ with Redis.
- **Optional Dependencies**: `bullmq`, `ioredis` (if connecting to external Redis instance).
- **How to enable & use**:
  ```typescript
  import { sharedInMemoryQueue, getIntegrationRegistry } from '@/lib/integrations'

  // Submit a job
  const jobResult = await getIntegrationRegistry().execute('queue:in-memory', {
    name: 'generate-report',
    data: { reportId: 42 },
    priority: 5,
  })

  // Worker loop
  await sharedInMemoryQueue.processNext(async (job) => {
    return { status: 'generated', id: job.data.reportId }
  })
  ```
- **Local / Mock Alternative**: `queue:in-memory` provides full queue semantics without Redis or background daemon processes.
- **Limitations & Licensing**: In-memory queues do not persist across serverless function instances or process restarts. MIT license.

---

### 8. Reusable Authentication & Authorization Toolkit (RBAC/ABAC)
- **Status**: `READY` (Full toolkit implemented in [`src/lib/auth/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/auth/))
- **Reference Repositories**:
  - [`better-auth/better-auth`](https://github.com/better-auth/better-auth) (Apache-2.0): TypeScript-first modular auth framework and session patterns.
  - [`nextauthjs/next-auth`](https://github.com/nextauthjs/next-auth) (ISC): Next.js session management, OAuth callback exchange, and cookie configuration.
  - [`lucia-auth/lucia`](https://github.com/lucia-auth/lucia) (MIT): Session lifecycle and database session schema reference (deprecated in 2024; evaluated and modernized).
  - [`stalniy/casl`](https://github.com/stalniy/casl) (MIT): Isomorphic declarative ability and permission engine (`can(action, subject)`).
- **What it enables**: Complete user authentication, scrypt password hashing, session tokens, cookie security, declarative RBAC/ABAC rules, server-side guards, and frontend ability components.
- **Required Environment Variables**: None for `mock` or local sessions. Supabase credentials (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) if using Supabase auth.
- **Optional Dependencies**: None (uses Node.js standard `crypto` for scrypt hashing and timing-safe comparison).
- **How to enable & use**:
  ```typescript
  import {
    hashPassword,
    verifyPassword,
    createSession,
    defineAbilityFor,
    requireRole,
    requirePermission,
    AuthProvider,
    Can,
    ProtectedRoute,
  } from '@/lib/auth'

  // 1. Password hashing & verification
  const hash = await hashPassword('UserPassword123')
  const isValid = await verifyPassword('UserPassword123', hash)

  // 2. CASL-style Ability definition
  const user = { id: 'usr_1', email: 'alice@test.com', role: 'user' }
  const ability = defineAbilityFor(user)

  console.log(ability.can('read', 'Project')) // true
  console.log(ability.can('update', 'Project', { ownerId: 'usr_1' })) // true (own resource)
  console.log(ability.can('update', 'Project', { ownerId: 'usr_2' })) // false (other's resource)

  // 3. Server-side API / Server Action Guards
  const roleCheck = requireRole(user, 'admin')
  if (!roleCheck.allowed) {
    // Returns 403 Forbidden
  }

  const permCheck = requirePermission(ability, 'delete', 'Project', { ownerId: 'usr_1' })
  if (!permCheck.allowed) {
    // Returns 403 Forbidden
  }
  ```
- **Declarative Frontend Components**:
  ```tsx
  import { Can, ProtectedRoute, useAuth, useAbility } from '@/lib/auth'

  export function ProjectCard({ project }: { project: any }) {
    return (
      <div>
        <h3>{project.title}</h3>
        {/* Hide/show UI based on user's ABAC permissions */}
        <Can I="delete" an="Project" this={project}>
          <button onClick={() => deleteProject(project.id)}>Delete</button>
        </Can>
      </div>
    )
  }

  // Protect whole page or panel
  export function AdminSettings() {
    return (
      <ProtectedRoute roles={['admin']} fallback={<p>Access Denied</p>}>
        <AdminControls />
      </ProtectedRoute>
    )
  }
  ```
- **Local / Mock Alternative**: `MockAuthProvider` provides in-memory users (`admin@example.com`, `user@example.com`, `editor@example.com`, password: `Password123`), session validation, and registration for 100% offline development and automated testing.
- **Limitations & Licensing**: In-memory session store is ephemeral; persistent sessions across multi-instance serverless deployments should plug a database adapter (e.g. Supabase, PostgreSQL, or Redis). Apache-2.0 and MIT licenses permit commercial and hackathon reuse.

---

### 7. Database, Storage & Caching Layer
- **Status**: `READY` (In-memory implementations active; Supabase & Redis adapters pluggable)
- **Reference Repositories**:
  - **Prisma**: [`prisma/prisma`](https://github.com/prisma/prisma) (Apache-2.0) — Typed data modeling, migrations, and repository access conventions.
  - **Drizzle ORM**: [`drizzle-team/drizzle-orm`](https://github.com/drizzle-team/drizzle-orm) (Apache-2.0) — Lightweight, zero-overhead SQL-like querying and transactions.
  - **Supabase JavaScript**: [`supabase/supabase-js`](https://github.com/supabase/supabase-js) (MIT) — PostgREST database queries, auth, and S3-compatible cloud storage.
  - **Redis**: [`redis/redis`](https://github.com/redis/redis) (RSALv2 / SSPLv1) & Upstash Redis REST — Key-value caching, TTL expiration, and atomic operations.
  - **MinIO**: [`minio/minio`](https://github.com/minio/minio) (AGPL-3.0) — S3-compatible object storage API reference, signed URLs, and bucket management.
- **What it enables**: Complete data persistence, secure file uploads/retrieval, and high-performance caching for any hackathon problem statement without rebuilding infrastructure:
  - **Database Abstraction**: `IRepository<T>`, `InMemoryDatabaseAdapter` (snapshot-based atomic transaction rollback), `checkDatabaseHealth` diagnostics, and `MigrationManager` with PostgreSQL starter schemas.
  - **File Storage**: `IFileStorageAdapter`, `LocalStorageAdapter`, `SupabaseStorageAdapter`, anti-directory traversal guard (`sanitizeStoragePath`), collision-resistant safe path generator (`generateSafeStoragePath`), file size & MIME validators, HMAC signed URLs, and authorization enforcement (`verifyStorageAccess`).
  - **Caching**: `ICache`, `InMemoryCache`, `RedisCacheAdapter` (REST-based via native `fetch`), TTL expiration, cache-key namespacing, and non-crashing fallback via `getOrSet`.
- **Required Environment Variables**: None for local/test mode. Optional:
  - `DATABASE_URL`: PostgreSQL connection string (automatically masked in logs).
  - `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Cloud database and storage.
  - `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` (or `REDIS_REST_URL` & `REDIS_REST_TOKEN`): Remote Redis cache.
- **How to enable & use**:
  ```typescript
  import { sharedDatabaseAdapter } from '@/lib/database'
  import { sharedFileStorage } from '@/lib/storage'
  import { sharedCache } from '@/lib/cache'

  // 1. Typed Database Repository & Atomic Transactions
  interface Project {
    id: string
    title: string
    status: string
    ownerId: string
  }

  const projectRepo = sharedDatabaseAdapter.getRepository<Project>('projects')
  await projectRepo.create({ id: 'p1', title: 'AI Assistant', status: 'active', ownerId: 'usr_1' })

  // Atomic transaction with automatic snapshot rollback on failure
  await sharedDatabaseAdapter.transaction(async (tx) => {
    const repo = tx.getRepository<Project>('projects')
    await repo.update('p1', { status: 'published' })
    // If an error is thrown here, all changes automatically revert!
  })

  // 2. Safe File Storage & Access Boundaries
  const fileBuffer = Buffer.from('Report content...')
  const uploadResult = await sharedFileStorage.upload(fileBuffer, 'quarterly-report.pdf', {
    ownerId: 'usr_1',
    isPublic: false,
  })

  // Generate 15-minute temporary signed download URL
  const downloadUrl = await sharedFileStorage.getSignedUrl(uploadResult.file!.path, {
    expiresInSeconds: 900,
  })

  // 3. Resilient Caching with Namespaces
  const cachedProjects = sharedCache.namespace('projects')
  const data = await cachedProjects.getOrSet(
    'published_list',
    async () => projectRepo.find({ status: 'published' }),
    300 // 5-minute TTL
  )
  ```
- **Local / Mock Alternative**: `InMemoryDatabaseAdapter`, `LocalStorageAdapter`, and `InMemoryCache` operate completely in-memory with zero cloud or native C++ dependencies.
- **Limitations & Considerations**: In-memory stores are ephemeral and scoped to the active Node.js process. In multi-container or serverless deployments, configure `DATABASE_URL` or Supabase for persistent data storage across server restarts.

---

### 8. Maps, Geolocation & Routing Layer
- **Status**: `READY` (SSR-safe React map component, deterministic math, and mock providers active; OSM & OSRM pluggable)
- **Reference Repositories**:
  - **Leaflet**: [`Leaflet/Leaflet`](https://github.com/Leaflet/Leaflet) (BSD-2-Clause) — Web Mercator projection formulas, coordinate projection, markers, and popup behaviors.
  - **MapLibre GL JS**: [`maplibre/maplibre-gl-js`](https://github.com/maplibre/maplibre-gl-js) (BSD-3-Clause) — Vector route layer rendering and accessible interactive viewport controls.
  - **React Leaflet**: [`PaulLeCam/react-leaflet`](https://github.com/PaulLeCam/react-leaflet) (Hippocratic / MIT) — Component abstractions, props contracts, and React event models.
  - **OSRM**: [`Project-OSRM/osrm-backend`](https://github.com/Project-OSRM/osrm-backend) (BSD-2-Clause) — Multi-modal route calculation protocols (car, bike, foot), polyline geometry, and turn-by-turn steps.
  - **Turf.js**: [`Turfjs/turf`](https://github.com/Turfjs/turf) (MIT) — Haversine distance, initial compass bearing, destination point projection, and bounding box calculations.
- **What it enables**: Interactive maps, user location acquisition, geocoding, distance math, route calculations, and nearby POI search for any hackathon challenge:
  - **Geospatial Math**: Pure TypeScript Haversine distance calculations (`calculateDistance`), bearing azimuth (`calculateBearing`), and bounding box enclosing (`calculateBoundingBox`).
  - **Browser Geolocation**: `requestGeolocation` acquiring location only on explicit user consent (never silent), normalizing permission denials, timeouts, and unavailabilities.
  - **Geocoding**: `IGeocodingProvider` with `MockGeocodingProvider` (deterministic global tech hubs) and `NominatimGeocodingProvider` (OpenStreetMap).
  - **Routing**: `IRoutingProvider` supporting driving, walking, and cycling travel modes with `MockRoutingProvider` and `OSRMRoutingProvider`.
  - **Nearby Search**: `INearbySearchProvider` with `MockNearbySearchProvider` and `OverpassNearbySearchProvider` (OSM Overpass API).
  - **Interactive Map Components**: `<InteractiveMap />` (100% SSR-safe, markers, popups, route polylines, zoom/pan controls, click-to-pin) and `<LocationPicker />` (search input, "Use My Location" explicit consent button, and interactive map preview).
- **Tile Usage Policies & Licensing**:
  - OpenStreetMap standard tiles (`tile.openstreetmap.org`) require appropriate attribution (`© OpenStreetMap contributors`) and forbid bulk pre-downloading or heavy automated scraping.
  - Commercial or heavy deployments should configure a dedicated vector tile provider (e.g. Mapbox, MapTiler, Protomaps, or self-hosted tile server).
- **How to enable & use**:
  ```tsx
  import { calculateDistance, formatDistance, sharedRoutingProvider } from '@/lib/geo'
  import { InteractiveMap, LocationPicker } from '@/components/geo'

  // 1. Calculate distances & routes
  const sf = { lat: 37.7749, lng: -122.4194 }
  const oakland = { lat: 37.8044, lng: -122.2712 }
  const distanceKm = calculateDistance(sf, oakland, 'kilometers')
  const route = await sharedRoutingProvider.calculateRoute(sf, oakland, { mode: 'driving' })

  // 2. Render interactive map with markers and route polyline
  export function DispatchMap() {
    return (
      <InteractiveMap
        center={sf}
        zoom={12}
        markers={[
          { id: '1', position: sf, title: 'Origin Hub', color: '#3b82f6' },
          { id: '2', position: oakland, title: 'Delivery Destination', color: '#10b981' },
        ]}
        routeCoordinates={route.coordinates}
        height={400}
      />
    )
  }

  // 3. Location picker form component
  export function SelectAddressForm() {
    return (
      <LocationPicker
        label="Set Pickup Point"
        onLocationSelect={(coords, address) => {
          console.log('Selected:', coords, address)
        }}
      />
    )
  }
  ```
- **Local / Mock Alternative**: `MockGeocodingProvider`, `MockRoutingProvider`, and `MockNearbySearchProvider` operate 100% offline with zero network calls and zero paid credentials.
- **Privacy & Security Constraints**:
  - Precision coordinates are never stored to persistent databases or logged without user consent.
  - Browser geolocation is never requested on module load or page boot.
  - Third-party geocoding and routing endpoints are accessed with timeouts (`AbortSignal.timeout(3000)`) and safe fallbacks.

---

### 9. Payments & Webhook Infrastructure
- **Status**: `READY` (In-memory mock simulator & signature verification active; Stripe & Razorpay pluggable)
- **Reference Repositories**:
  - **Stripe Node.js SDK**: [`stripe/stripe-node`](https://github.com/stripe/stripe-node) (Apache-2.0) — Checkout Sessions, PaymentIntents, webhook signature formats (`t=...,v1=...`), and tolerance checking.
  - **Razorpay Node.js SDK**: [`razorpay/razorpay-node`](https://github.com/razorpay/razorpay-node) (MIT) — Order creation, payment status polling, and HMAC-SHA256 signature verification.
  - **Svix**: [`svix/svix-webhooks`](https://github.com/svix/svix-webhooks) (Apache-2.0) — Webhook event lifecycle, timestamp anti-replay verification, and payload signing standards.
  - **Standard Webhooks**: [`standard-webhooks/standard-webhooks`](https://github.com/standard-webhooks/standard-webhooks) (Apache-2.0) — Universal webhook specification, message IDs, and signature headers.
- **What it enables**: Provider-neutral checkout flows, status polling, and cryptographic webhook listeners for monetization, subscriptions, or external event synchronization:
  - **Payment Validation**: Integer minor unit validation (cents/paise), ISO-4217 currency enforcement, reference ID sanitization, and monetary formatting.
  - **Checkout Abstraction**: `createCheckoutSession` creating hosted checkout URLs, linking to application reference IDs (`order_123`).
  - **Cryptographic Verification**: `verifyStripeSignature`, `verifyHmacSha256Signature`, and `verifyStandardWebhookSignature` using constant-time comparison (`timingSafeEqualStrings`).
  - **Idempotency Guard**: `InMemoryIdempotencyStore` tracking processed event IDs to prevent duplicate webhook delivery from repeating side-effects.
  - **Webhook Pipeline**: `IdempotentWebhookHandler` with event-specific listeners (`on('checkout.session.completed', ...)`) and wildcard listeners (`on('*', ...)`).
- **Required Environment Variables**: None for offline/mock development. Optional:
  - `STRIPE_SECRET_KEY`: Stripe API secret key (e.g. `sk_test_...` or `sk_live_...`).
  - `STRIPE_WEBHOOK_SECRET`: Stripe endpoint signing secret (e.g. `whsec_...`).
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Client-side publishable key for Elements/Checkout redirects.
  - `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`: Razorpay credentials.
- **How to enable & use**:
  ```typescript
  import {
    sharedPaymentProvider,
    sharedWebhookHandler,
    formatCurrencyAmount,
  } from '@/lib/payments'

  // 1. Create a checkout session
  const session = await sharedPaymentProvider.createCheckoutSession({
    referenceId: 'order_hck_2026',
    amount: 2500, // $25.00
    currency: 'USD',
    customerEmail: 'developer@example.com',
    successUrl: 'https://myapp.com/checkout/success',
    cancelUrl: 'https://myapp.com/checkout/cancel',
  })
  console.log('Redirect user to:', session.checkoutUrl)

  // 2. Query status programmatically (Never trust frontend query parameters alone!)
  const status = await sharedPaymentProvider.getPaymentStatus(session.sessionId)
  if (status.status === 'succeeded') {
    // Fulfill order
  }

  // 3. Register idempotent webhook event listener
  sharedWebhookHandler.on('checkout.session.completed', async (event) => {
    const data = event.data as Record<string, any>
    const orderId = data.client_reference_id
    console.log(`Payment confirmed for ${orderId}`)
    // Safe: duplicates will automatically be suppressed by idempotency store!
  })

  // 4. In your Route Handler (/app/api/webhooks/stripe/route.ts):
  export async function POST(req: Request) {
    const rawBody = await req.text()
    const signature = req.headers.get('stripe-signature') || ''
    const secret = process.env.STRIPE_WEBHOOK_SECRET || ''

    const result = await sharedWebhookHandler.handleStripeWebhook(rawBody, signature, secret)
    return Response.json(result, { status: result.status === 'failed' ? 400 : 200 })
  }
  ```
- **Local / Mock Alternative**: `MockPaymentProvider` generates mock checkout URLs, allows simulating transitions via `simulatePaymentStatus('mock_cs_...', 'succeeded')`, and creates valid mock webhook events without Stripe keys.
- **Security Guardrails**:
  - Raw request bodies must be passed into verifiers before JSON parsing.
  - Never store raw card numbers, CVVs, or payment secrets in project databases.
  - Always verify signatures and check idempotency before fulfilling purchases or granting user credits.

---

### 10. Background Jobs & Multi-Step Workflows
- **Status**: `READY`
- **Reference Repositories**:
  - [`taskforcesh/bullmq`](https://github.com/taskforcesh/bullmq) (MIT) — Job lifecycle, queues, workers, concurrency, exponential backoff.
  - [`inngest/inngest`](https://github.com/inngest/inngest) (Apache-2.0 / BSL) — Step functions, durable executions, memoized step replays.
  - [`temporalio/temporal`](https://github.com/temporalio/temporal) (MIT) — Workflow checkpoints, failure isolation, side-effect compensation.
  - [`triggerdotdev/trigger.dev`](https://github.com/triggerdotdev/trigger.dev) (Apache-2.0) — Task execution, scheduling, real-time progress.
- **Location**: [`src/lib/jobs/`](file:///c:/Users/rspma/Downloads/Hackathon-starter/src/lib/jobs/) (`types.ts`, `queue.ts`, `scheduler.ts`, `workflow.ts`, `index.ts`)
- **Required Environment Variables**: None for local development. (Optional: `REDIS_URL` if connecting a distributed Redis worker for BullMQ).
- **How to enable & use**:
  ```typescript
  import {
    LocalJobQueue,
    sharedJobQueue,
    JobWorkflowBuilder,
    JobWorkflowEngine,
    JobScheduler,
  } from '@/lib/jobs'

  // 1. Register a typed background job handler
  sharedJobQueue.registerHandler<{ documentId: string }, { summary: string }>(
    'summarize_document',
    async (job, ctx) => {
      ctx.log(`Processing document ${job.data.documentId}`)
      await ctx.updateProgress(25, 'Downloading document')
      // Long-running async task...
      await ctx.updateProgress(100, 'Finished summary')
      return { summary: 'Document summary text...' }
    },
    { timeoutMs: 30000, priority: 5 }
  )

  // 2. Enqueue a job with submission idempotency & retry safeguards
  const job = await sharedJobQueue.enqueue(
    'summarize_document',
    { documentId: 'doc_42' },
    {
      idempotencyKey: 'summarize_doc_42',
      isIdempotent: true,
      retryPolicy: { maxRetries: 2, strategy: 'exponential', backoffMs: 1000 },
    }
  )

  // 3. Composable multi-step workflow pipeline with checkpoints
  const steps = new JobWorkflowBuilder<{ rawInput: string; processed?: string; aiResult?: string }>()
    .step({
      id: 'validate',
      name: 'Validate Input',
      execute: (ctx) => ({ success: Boolean(ctx.context.rawInput) }),
    })
    .step({
      id: 'process',
      name: 'Clean Data',
      execute: (ctx) => ({
        success: true,
        patchContext: { processed: ctx.context.rawInput.trim() },
      }),
    })
    .step({
      id: 'call_ai',
      name: 'Execute AI Step',
      execute: (ctx) => ({
        success: true,
        patchContext: { aiResult: `AI Output for: ${ctx.context.processed}` },
      }),
    })
    .build()

  const workflowEngine = new JobWorkflowEngine({
    workflowId: 'wf_doc_pipeline_1',
    initialContext: { rawInput: '  hackathon brief  ' },
    steps,
  })

  const outcome = await workflowEngine.run()
  console.log('Workflow status:', outcome.status, outcome.context)
  ```
- **Recurring Schedules**:
  ```typescript
  import { sharedJobScheduler, sharedJobQueue } from '@/lib/jobs'

  sharedJobScheduler.setQueue(sharedJobQueue)
  sharedJobScheduler.registerRecurring({
    id: 'nightly_data_sync',
    name: 'data_sync',
    data: { syncAll: true },
    cronExpression: '0 2 * * *', // Every day at 2:00 AM
  })
  sharedJobScheduler.start()
  ```
- **Infrastructure Requirements & Limitations**:
  - The built-in `LocalJobQueue` operates 100% in-memory without requiring Redis, Docker, or external cloud workers.
  - **Limitation**: In-memory jobs and idempotency records do not survive Node.js process restarts.
  - For horizontally scaled serverless deployments (Vercel/Cloudflare), use webhook triggers or connect a backing database/Redis queue.
- **Safety Directives**:
  - Non-idempotent operations (payment charges, external emails, SMS) reject automatic retries unless explicitly declared `isIdempotent: true` or `retryPolicy.nonIdempotentSafe: true`.
  - Mutating steps record `uncertainStepId` in checkpoints to detect and prevent duplicate external side-effects upon resumption.


