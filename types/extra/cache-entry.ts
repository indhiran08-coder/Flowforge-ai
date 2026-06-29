// cache-entry types for FlowForge AI
export interface CacheEntry {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type CacheEntryList = CacheEntry[]
export type CreateCacheEntry = Omit<CacheEntry, 'id' | 'createdAt' | 'updatedAt'>
