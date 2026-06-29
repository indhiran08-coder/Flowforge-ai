// variable-map types for FlowForge AI
export interface VariableMap {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type VariableMapList = VariableMap[]
export type CreateVariableMap = Omit<VariableMap, 'id' | 'createdAt' | 'updatedAt'>
