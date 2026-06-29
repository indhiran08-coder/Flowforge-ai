// sidebar-state types for FlowForge AI
export interface SidebarState {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type SidebarStateList = SidebarState[]
export type CreateSidebarState = Omit<SidebarState, 'id' | 'createdAt' | 'updatedAt'>
