// database config for FlowForge AI
export const databaseConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
