// queue config for FlowForge AI
export const queueConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
