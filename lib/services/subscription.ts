// subscription service for FlowForge AI
export class subscriptionService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const subscriptionService = new subscriptionService()
