// scheduler service for FlowForge AI
export class schedulerService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const schedulerService = new schedulerService()
