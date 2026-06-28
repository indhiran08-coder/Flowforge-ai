export type SortDirection = 'asc'|'desc'
export interface SortInput { field: string; direction: SortDirection }
export interface WorkflowFilterInput { status?: 'ACTIVE'|'INACTIVE'; search?: string; sort?: SortInput }
export interface ExecutionFilterInput { workflowId?: string; status?: string; sort?: SortInput }
