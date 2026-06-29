// token service for FlowForge AI
export class tokenService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const tokenService = new tokenService()
