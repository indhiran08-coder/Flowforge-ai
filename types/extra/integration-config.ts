// integration-config types for FlowForge AI
export interface IntegrationConfig {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type IntegrationConfigList = IntegrationConfig[]
export type CreateIntegrationConfig = Omit<IntegrationConfig, 'id' | 'createdAt' | 'updatedAt'>
