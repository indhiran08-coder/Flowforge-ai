// log-entry types for FlowForge AI
export interface LogEntry {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type LogEntryList = LogEntry[]
export type CreateLogEntry = Omit<LogEntry, 'id' | 'createdAt' | 'updatedAt'>
