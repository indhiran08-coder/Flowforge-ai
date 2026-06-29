// rate-limit-info types for FlowForge AI
export interface RateLimitInfo {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type RateLimitInfoList = RateLimitInfo[]
export type CreateRateLimitInfo = Omit<RateLimitInfo, 'id' | 'createdAt' | 'updatedAt'>
