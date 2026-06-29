// logic-config types for FlowForge AI
export interface LogicConfig {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type LogicConfigList = LogicConfig[]
export type CreateLogicConfig = Omit<LogicConfig, 'id' | 'createdAt' | 'updatedAt'>
