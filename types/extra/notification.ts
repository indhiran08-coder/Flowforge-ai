// notification types for FlowForge AI
export interface Notification {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type NotificationList = Notification[]
export type CreateNotification = Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>
