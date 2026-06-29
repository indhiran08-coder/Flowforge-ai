// redis config for FlowForge AI
export const redisConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
