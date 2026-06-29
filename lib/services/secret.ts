// secret service for FlowForge AI
export class secretService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const secretService = new secretService()
