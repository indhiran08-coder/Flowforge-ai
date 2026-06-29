// analytics service for FlowForge AI
export class analyticsService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const analyticsService = new analyticsService()
