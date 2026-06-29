// action-config types for FlowForge AI
export interface ActionConfig {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type ActionConfigList = ActionConfig[]
export type CreateActionConfig = Omit<ActionConfig, 'id' | 'createdAt' | 'updatedAt'>
