// notification service for FlowForge AI
export class notificationService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const notificationService = new notificationService()
