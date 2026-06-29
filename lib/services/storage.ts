// storage service for FlowForge AI
export class storageService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const storageService = new storageService()
