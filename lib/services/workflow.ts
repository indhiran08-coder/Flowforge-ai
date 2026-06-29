// workflow service for FlowForge AI
export class workflowService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const workflowService = new workflowService()
