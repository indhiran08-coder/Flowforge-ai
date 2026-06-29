// sse-event types for FlowForge AI
export interface SseEvent {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type SseEventList = SseEvent[]
export type CreateSseEvent = Omit<SseEvent, 'id' | 'createdAt' | 'updatedAt'>
