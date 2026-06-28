export type WorkflowStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT'
export interface WorkflowNode { id: string; type: string; position: { x: number; y: number }; data: Record<string, unknown> }
export interface WorkflowEdge { id: string; source: string; target: string }
