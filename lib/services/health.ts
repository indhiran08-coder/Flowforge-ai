// health service for FlowForge AI
export class healthService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const healthService = new healthService()
