// integration service for FlowForge AI
export class integrationService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const integrationService = new integrationService()
