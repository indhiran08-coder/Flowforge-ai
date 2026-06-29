// logger service for FlowForge AI
export class loggerService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const loggerService = new loggerService()
