import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Rocket,
  ShieldCheck,
  Zap,
  Database,
  ArrowRight,
  Terminal,
  CheckCircle,
  Cpu,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/config'

export default async function HomePage() {
  let user = null
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { data } = await supabase.auth.getUser()
      user = data.user
    } catch {
      // In dev or unconfigured fallback
    }
  }

  const stackHighlights = [
    {
      title: 'Next.js 16 App Router',
      description: 'Server Components by default, async cookies, streaming, and Turbopack.',
      icon: Zap,
    },
    {
      title: 'Supabase Authentication',
      description: 'Official @supabase/ssr session management, protected routes, and email flows.',
      icon: Database,
    },
    {
      title: 'Modern UI & Design System',
      description: 'Tailwind CSS v4 with curated tokens, shadcn/ui primitives, and dark mode.',
      icon: ShieldCheck,
    },
    {
      title: 'AI Coding Agent Ready',
      description: 'Structured AGENTS.md, decoupled architecture, and explicit development workflows.',
      icon: Cpu,
    },
  ]

  const featureChecklist = [
    'Zero Domain Coupling — Ready for any hackathon problem statement',
    'Pre-built Login, Registration, and Protected Dashboard Shell',
    'Automated Vitest unit tests and Playwright E2E smoke tests',
    'Ready for immediate 1-click Vercel deployment',
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar user={user} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl" />

          <div className="container mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50/80 dark:bg-blue-950/50 px-3.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 mb-6 backdrop-blur-sm">
              <Rocket className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Production-Ready Hackathon Starter — Stage 1</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Ship Your Hackathon MVP{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                in Hours, Not Days
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              A high-velocity, full-stack foundation powered by Next.js App Router, Supabase Auth,
              Tailwind CSS, and strict TypeScript. Built specifically for rapid AI-assisted development.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2 shadow-lg shadow-blue-500/20">
                    Go to Your Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <Button size="lg" className="gap-2 shadow-lg shadow-blue-500/20">
                      Get Started Free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <Terminal className="h-3.5 w-3.5" />
              <span>git clone https://github.com/sakshamgupta005/Hackathon-starter</span>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 sm:py-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Architected for Rapid Extension
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Every component is modular, decoupled from any single business domain, and built
                to help you start implementing your challenge brief immediately.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stackHighlights.map((feat) => {
                const Icon = feat.icon
                return (
                  <Card key={feat.title} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-2">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base font-semibold">{feat.title}</CardTitle>
                      <CardDescription className="text-xs leading-relaxed">
                        {feat.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Value Proposition Checklist */}
        <section className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm">
              <h3 className="text-2xl font-bold tracking-tight mb-6">
                What&apos;s Included Out-of-the-Box
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featureChecklist.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 leading-normal">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Ready to adapt for your next hackathon project.
                </div>
                <Link href="/dashboard">
                  <Button size="sm" variant="secondary" className="gap-2">
                    Explore Starter Dashboard
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
