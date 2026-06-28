export type ExecutionEventType = 'EXECUTION_STARTED'|'NODE_STARTED'|'NODE_COMPLETED'|'NODE_FAILED'|'EXECUTION_COMPLETED'|'EXECUTION_FAILED'|'LOG'
export interface ExecutionEvent { type: ExecutionEventType; timestamp: string; executionId: string }
export interface LogEvent extends ExecutionEvent { type: 'LOG'; level: 'info'|'warn'|'error'; message: string }
