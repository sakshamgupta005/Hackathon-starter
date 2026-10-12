import Link from 'next/link'
import { Rocket } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              Hackathon Starter
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              — Production-Ready Foundation
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/login" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Sign Up
            </Link>
            <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-500">
            Built with Next.js App Router, Supabase, Tailwind CSS, & shadcn/ui.
          </div>
        </div>
      </div>
    </footer>
  )
}
