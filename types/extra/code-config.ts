// code-config types for FlowForge AI
export interface CodeConfig {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type CodeConfigList = CodeConfig[]
export type CreateCodeConfig = Omit<CodeConfig, 'id' | 'createdAt' | 'updatedAt'>
