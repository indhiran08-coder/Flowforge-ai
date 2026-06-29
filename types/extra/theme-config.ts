// theme-config types for FlowForge AI
export interface ThemeConfig {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type ThemeConfigList = ThemeConfig[]
export type CreateThemeConfig = Omit<ThemeConfig, 'id' | 'createdAt' | 'updatedAt'>
