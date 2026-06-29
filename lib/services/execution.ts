// execution service for FlowForge AI
export class executionService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const executionService = new executionService()
