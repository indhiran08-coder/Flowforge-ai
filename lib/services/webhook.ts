// webhook service for FlowForge AI
export class webhookService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const webhookService = new webhookService()
