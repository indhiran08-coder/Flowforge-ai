// stream service for FlowForge AI
export class streamService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const streamService = new streamService()
