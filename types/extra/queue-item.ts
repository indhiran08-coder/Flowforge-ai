// queue-item types for FlowForge AI
export interface QueueItem {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type QueueItemList = QueueItem[]
export type CreateQueueItem = Omit<QueueItem, 'id' | 'createdAt' | 'updatedAt'>
