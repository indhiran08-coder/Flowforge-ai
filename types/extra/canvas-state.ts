// canvas-state types for FlowForge AI
export interface CanvasState {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type CanvasStateList = CanvasState[]
export type CreateCanvasState = Omit<CanvasState, 'id' | 'createdAt' | 'updatedAt'>
