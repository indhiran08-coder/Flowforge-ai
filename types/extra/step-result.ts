// step-result types for FlowForge AI
export interface StepResult {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type StepResultList = StepResult[]
export type CreateStepResult = Omit<StepResult, 'id' | 'createdAt' | 'updatedAt'>
