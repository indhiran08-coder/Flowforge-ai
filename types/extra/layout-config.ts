// layout-config types for FlowForge AI
export interface LayoutConfig {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type LayoutConfigList = LayoutConfig[]
export type CreateLayoutConfig = Omit<LayoutConfig, 'id' | 'createdAt' | 'updatedAt'>
