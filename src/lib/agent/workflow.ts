/**
 * Bounded Agent Workflow Engine
 * 
 * Capabilities:
 * - Deterministic, step-by-step execution pipeline (e.g. Plan -> Execute -> Verify)
 * - Strict bounding: hard maximum step count to prevent infinite agent loops
 * - Structured step telemetry (duration, attempts, logs, errors)
 * - Safe rollback / error capture
 */

export interface StepResult<TContext> {
  success: boolean
  nextStepId?: string | null
  error?: string
  patchContext?: Partial<TContext>
}

export interface WorkflowStep<TContext> {
  id: string
  name: string
  execute: (context: Readonly<TContext>) => Promise<StepResult<TContext>> | StepResult<TContext>
  maxRetries?: number
}

export interface WorkflowStepLog {
  stepId: string
  stepName: string
  attempts: number
  durationMs: number
  success: boolean
  error?: string
}

export interface WorkflowRunResult<TContext> {
  success: boolean
  completedSteps: WorkflowStepLog[]
  totalDurationMs: number
  totalIterations: number
  context: TContext
  finalStepId: string | null
  error?: string
}

export interface WorkflowOptions {
  /** Hard cap on total step executions to prevent runaway loops (default: 15) */
  maxIterations?: number
  /** Overall workflow timeout in milliseconds (default: 30,000ms) */
  timeoutMs?: number
}

export class BoundedWorkflow<TContext extends Record<string, unknown>> {
  private steps = new Map<string, WorkflowStep<TContext>>()
  private initialStepId: string | null = null

  addStep(step: WorkflowStep<TContext>): this {
    this.steps.set(step.id, step)
    if (!this.initialStepId) {
      this.initialStepId = step.id
    }
    return this
  }

  async run(
    initialContext: TContext,
    options: WorkflowOptions = {}
  ): Promise<WorkflowRunResult<TContext>> {
    const { maxIterations = 15, timeoutMs = 30000 } = options
    const startTime = Date.now()
    const completedSteps: WorkflowStepLog[] = []
    let currentContext = { ...initialContext }
    let currentStepId = this.initialStepId
    let iterationCount = 0

    if (!currentStepId) {
      return {
        success: false,
        completedSteps: [],
        totalDurationMs: 0,
        totalIterations: 0,
        context: currentContext,
        finalStepId: null,
        error: 'Workflow has no registered steps.',
      }
    }

    while (currentStepId && iterationCount < maxIterations) {
      if (Date.now() - startTime > timeoutMs) {
        return {
          success: false,
          completedSteps,
          totalDurationMs: Date.now() - startTime,
          totalIterations: iterationCount,
          context: currentContext,
          finalStepId: currentStepId,
          error: `Workflow timed out after ${timeoutMs}ms.`,
        }
      }

      const step = this.steps.get(currentStepId)
      if (!step) {
        return {
          success: false,
          completedSteps,
          totalDurationMs: Date.now() - startTime,
          totalIterations: iterationCount,
          context: currentContext,
          finalStepId: currentStepId,
          error: `Unknown step ID: ${currentStepId}`,
        }
      }

      iterationCount++
      const stepStart = Date.now()
      let attempts = 0
      const maxRetries = step.maxRetries ?? 0
      let stepSuccess = false
      let stepError: string | undefined
      let nextStepId: string | null | undefined = null

      while (attempts <= maxRetries && !stepSuccess) {
        attempts++
        try {
          const result = await step.execute(currentContext)
          if (result.success) {
            stepSuccess = true
            if (result.patchContext) {
              currentContext = { ...currentContext, ...result.patchContext }
            }
            nextStepId = result.nextStepId
          } else {
            stepError = result.error || 'Step returned unsuccessful status'
          }
        } catch (err) {
          stepError = err instanceof Error ? err.message : String(err)
        }
      }

      completedSteps.push({
        stepId: step.id,
        stepName: step.name,
        attempts,
        durationMs: Date.now() - stepStart,
        success: stepSuccess,
        error: stepError,
      })

      if (!stepSuccess) {
        return {
          success: false,
          completedSteps,
          totalDurationMs: Date.now() - startTime,
          totalIterations: iterationCount,
          context: currentContext,
          finalStepId: currentStepId,
          error: `Step '${step.name}' failed after ${attempts} attempts: ${stepError}`,
        }
      }

      // If nextStepId is undefined, advance to the next registered step in insertion order
      if (nextStepId === undefined) {
        const stepKeys = Array.from(this.steps.keys())
        const currentIndex = stepKeys.indexOf(currentStepId)
        nextStepId = stepKeys[currentIndex + 1] ?? null
      }

      currentStepId = nextStepId
    }

    if (currentStepId && iterationCount >= maxIterations) {
      return {
        success: false,
        completedSteps,
        totalDurationMs: Date.now() - startTime,
        totalIterations: iterationCount,
        context: currentContext,
        finalStepId: currentStepId,
        error: `Exceeded maximum allowed iterations (${maxIterations}). Loop bounded safely.`,
      }
    }

    return {
      success: true,
      completedSteps,
      totalDurationMs: Date.now() - startTime,
      totalIterations: iterationCount,
      context: currentContext,
      finalStepId: null,
    }
  }
}
