// config service for FlowForge AI
export class configService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const configService = new configService()
