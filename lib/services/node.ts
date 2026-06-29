// node service for FlowForge AI
export class nodeService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const nodeService = new nodeService()
