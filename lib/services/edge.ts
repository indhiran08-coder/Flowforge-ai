// edge service for FlowForge AI
export class edgeService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const edgeService = new edgeService()
