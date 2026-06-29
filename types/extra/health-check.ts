// health-check types for FlowForge AI
export interface HealthCheck {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type HealthCheckList = HealthCheck[]
export type CreateHealthCheck = Omit<HealthCheck, 'id' | 'createdAt' | 'updatedAt'>
