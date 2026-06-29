// metric service for FlowForge AI
export class metricService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const metricService = new metricService()
