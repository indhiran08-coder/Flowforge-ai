// cache service for FlowForge AI
export class cacheService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const cacheService = new cacheService()
