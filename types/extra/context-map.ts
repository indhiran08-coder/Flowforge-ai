// context-map types for FlowForge AI
export interface ContextMap {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type ContextMapList = ContextMap[]
export type CreateContextMap = Omit<ContextMap, 'id' | 'createdAt' | 'updatedAt'>
