// audit-log types for FlowForge AI
export interface AuditLog {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type AuditLogList = AuditLog[]
export type CreateAuditLog = Omit<AuditLog, 'id' | 'createdAt' | 'updatedAt'>
