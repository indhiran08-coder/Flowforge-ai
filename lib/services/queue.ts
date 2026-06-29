// queue service for FlowForge AI
export class queueService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const queueService = new queueService()
