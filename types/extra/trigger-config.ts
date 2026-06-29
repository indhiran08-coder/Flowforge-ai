// trigger-config types for FlowForge AI
export interface TriggerConfig {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type TriggerConfigList = TriggerConfig[]
export type CreateTriggerConfig = Omit<TriggerConfig, 'id' | 'createdAt' | 'updatedAt'>
