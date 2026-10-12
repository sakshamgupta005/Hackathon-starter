import { Code2, Sparkles, Terminal } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ProjectPlaceholder() {
  const extensionChecklist = [
    {
      title: 'Define domain data models',
      description: 'Add your custom database tables and relations in Supabase SQL editor.',
      path: 'docs/ARCHITECTURE.md',
    },
    {
      title: 'Build feature components',
      description: 'Create your UI panels and interactive widgets inside src/components/.',
      path: 'src/components/',
    },
    {
      title: 'Add custom API routes / Server Actions',
      description: 'Expose endpoints for your AI agents, third-party APIs, or business logic.',
      path: 'src/app/api/ or src/app/actions/',
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-dashed border-2 border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">Hackathon Feature Canvas</CardTitle>
          <CardDescription className="max-w-xl mx-auto">
            This workspace area is pre-configured with authentication, sessions, and responsive styling.
            Replace this placeholder with your hackathon project&apos;s core domain features.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-3xl mx-auto pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {extensionChecklist.map((item, idx) => (
              <div
                key={item.title}
                className="flex flex-col justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900 text-xs font-bold text-blue-600 dark:text-blue-400">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded">
                  <Terminal className="h-3 w-3 shrink-0" />
                  <span className="truncate">{item.path}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-2">
                <Code2 className="h-4 w-4" />
                Inspect Architecture Docs
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
