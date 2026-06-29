// metric types for FlowForge AI
export interface Metric {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type MetricList = Metric[]
export type CreateMetric = Omit<Metric, 'id' | 'createdAt' | 'updatedAt'>
