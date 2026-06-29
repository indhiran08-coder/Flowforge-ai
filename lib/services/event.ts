// event service for FlowForge AI
export class eventService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const eventService = new eventService()
