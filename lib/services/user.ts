// user service for FlowForge AI
export class userService {
  async init() { return true }
  async dispose() { return true }
  isReady() { return true }
}
export const userService = new userService()
