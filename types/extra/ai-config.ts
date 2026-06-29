// ai-config types for FlowForge AI
export interface AiConfig {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type AiConfigList = AiConfig[]
export type CreateAiConfig = Omit<AiConfig, 'id' | 'createdAt' | 'updatedAt'>
