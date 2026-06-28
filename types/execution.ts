export type ExecutionStatus = 'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'
export interface ExecutionResult { id: string; workflowId: string; status: ExecutionStatus; startedAt: Date; completedAt?: Date; durationMs?: number; error?: string }
export interface ExecutionContext { executionId: string; workflowId: string; variables: Record<string,unknown> }
