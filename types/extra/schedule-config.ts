// schedule-config types for FlowForge AI
export interface ScheduleConfig {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type ScheduleConfigList = ScheduleConfig[]
export type CreateScheduleConfig = Omit<ScheduleConfig, 'id' | 'createdAt' | 'updatedAt'>
