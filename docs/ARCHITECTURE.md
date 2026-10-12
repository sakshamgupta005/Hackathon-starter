# System Architecture & Technical Specifications

## 1. Architectural Overview

The Hackathon Starter is designed as a modular, decoupled full-stack architecture built on Next.js 16 (App Router), Supabase (Auth + PostgreSQL), and Tailwind CSS v4.

```
                         Browser Client
                               |
                               v
                       Next.js Middleware
                     (src/middleware.ts)
                               |
            +------------------+------------------+
            |                                     |
            v                                     v
   Public Route (/)                     Protected Route (/dashboard)
            |                                     |
            |                                     v
            |                            Server Component
            |                      (supabase.auth.getUser())
            |                                     |
            +------------------+------------------+
                               |
                               v
                   Supabase Auth & Database
                 (@supabase/ssr Cookie Session)
```

## 2. Authentication Lifecycle

1. **Session Propagation**:
   - Authentication tokens are maintained in HTTP cookies managed by `@supabase/ssr`.
   - The Next.js middleware (`src/middleware.ts` calling `src/lib/supabase/middleware.ts`) refreshes the session on every non-static request.
2. **Server-Side Verification**:
   - Protected routes (`/dashboard`) independently invoke `await supabase.auth.getUser()` in their Server Component.
   - If no valid user is returned, the user is redirected via HTTP 307 to `/login?redirectTo=/dashboard`.
3. **PKCE & Email Confirmation**:
   - Email verification links and OAuth callbacks route to `/auth/callback?code=...`.
   - `src/app/auth/callback/route.ts` exchanges the auth code for a valid session using `supabase.auth.exchangeCodeForSession(code)`.

## 3. Directory Structure

```
├── docs/                   # Engineering documentation
│   ├── ARCHITECTURE.md     # System design & request lifecycle
│   ├── SETUP.md            # Environment & deployment guides
│   └── AGENT-WORKFLOW.md   # Standard development loop for AI agents
├── public/                 # Static assets
├── src/
│   ├── app/                # App Router pages and API routes
│   │   ├── auth/           # Callback and action routes
│   │   ├── dashboard/      # Authenticated workspace
│   │   ├── login/          # Sign-in route
│   │   ├── signup/         # Account registration route
│   │   ├── globals.css     # Design tokens and styles
│   │   ├── layout.tsx      # Root application layout
│   │   ├── not-found.tsx   # 404 handler
│   │   └── page.tsx        # Public landing page
│   ├── components/
│   │   ├── auth/           # Login & signup form components
│   │   ├── dashboard/      # Overview cards, project placeholders, setup alerts
│   │   ├── layout/         # Navbar, footer, dashboard shell
│   │   └── ui/             # Reusable design primitives (shadcn/ui style)
│   ├── lib/
│   │   ├── supabase/       # Browser, server, and middleware clients
│   │   ├── utils/          # CSS merge utilities
│   │   └── validations/    # Zod input schemas
│   ├── types/              # TypeScript types
│   └── middleware.ts       # Edge session middleware
├── tests/
│   ├── components/         # React Testing Library component tests
│   ├── e2e/                # Playwright smoke tests
│   └── unit/               # Schema and utility tests
├── .env.example            # Documented environment template
└── package.json            # Scripts and dependencies
```

## 4. UI/UX Foundations & Theming

- **Tailwind CSS v4**: Utilizes theme tokens defined in `src/app/globals.css`.
- **Theme Variables**: Supports both Light and Dark mode using semantic CSS variables (`--background`, `--foreground`, `--primary`, `--muted`, `--border`).
- **Accessible Primitives**: Form inputs, buttons, and alert components provide explicit ARIA roles, focus rings, disabled states, and responsive layouts.
