// ai service for FlowForge AI
export class aiService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const aiService = new aiService()
