// billing service for FlowForge AI
export class billingService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const billingService = new billingService()
