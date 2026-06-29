// credential service for FlowForge AI
export class credentialService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const credentialService = new credentialService()
