// node-execution types for FlowForge AI
export interface NodeExecution {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type NodeExecutionList = NodeExecution[]
export type CreateNodeExecution = Omit<NodeExecution, 'id' | 'createdAt' | 'updatedAt'>
