// audit service for FlowForge AI
export class auditService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const auditService = new auditService()
