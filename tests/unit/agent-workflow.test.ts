import { describe, it, expect } from 'vitest'
import { BoundedWorkflow } from '@/lib/agent/workflow'

interface DemoContext extends Record<string, unknown> {
  stepCount: number
  plan?: string
  executionResult?: string
  verified?: boolean
}

describe('BoundedWorkflow Engine', () => {
  it('runs linear workflow successfully across plan, execute, verify steps', async () => {
    const workflow = new BoundedWorkflow<DemoContext>()

    workflow
      .addStep({
        id: 'plan',
        name: 'Generate Plan',
        execute: () => ({
          success: true,
          patchContext: { plan: 'Step 1: Code, Step 2: Test' },
        }),
      })
      .addStep({
        id: 'execute',
        name: 'Execute Plan',
        execute: (ctx) => ({
          success: true,
          patchContext: { executionResult: `Executed: ${ctx.plan}` },
        }),
      })
      .addStep({
        id: 'verify',
        name: 'Verify Outcome',
        execute: () => ({
          success: true,
          patchContext: { verified: true },
        }),
      })

    const res = await workflow.run({ stepCount: 0 })

    expect(res.success).toBe(true)
    expect(res.completedSteps.length).toBe(3)
    expect(res.context.plan).toBe('Step 1: Code, Step 2: Test')
    expect(res.context.verified).toBe(true)
    expect(res.totalIterations).toBe(3)
  })

  it('bounds runaway infinite loops when a step keeps looping', async () => {
    const workflow = new BoundedWorkflow<DemoContext>()

    workflow.addStep({
      id: 'looping-step',
      name: 'Loop Forever',
      execute: (ctx) => ({
        success: true,
        nextStepId: 'looping-step', // self-loop
        patchContext: { stepCount: ctx.stepCount + 1 },
      }),
    })

    const res = await workflow.run({ stepCount: 0 }, { maxIterations: 5 })

    expect(res.success).toBe(false)
    expect(res.totalIterations).toBe(5)
    expect(res.error).toContain('Exceeded maximum allowed iterations')
    expect(res.context.stepCount).toBe(5)
  })

  it('stops and reports error when a step fails permanently', async () => {
    const workflow = new BoundedWorkflow<DemoContext>()

    workflow
      .addStep({
        id: 'failing-step',
        name: 'Flaky Step',
        execute: () => ({
          success: false,
          error: 'Database connection failed',
        }),
        maxRetries: 1,
      })
      .addStep({
        id: 'never-reached',
        name: 'Unreached Step',
        execute: () => ({ success: true }),
      })

    const res = await workflow.run({ stepCount: 0 })

    expect(res.success).toBe(false)
    expect(res.error).toContain("Step 'Flaky Step' failed after 2 attempts")
    expect(res.completedSteps.length).toBe(1)
    expect(res.completedSteps[0]?.attempts).toBe(2)
  })
})
