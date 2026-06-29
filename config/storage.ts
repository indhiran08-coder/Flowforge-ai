// storage config for FlowForge AI
export const storageConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
