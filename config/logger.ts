// logger config for FlowForge AI
export const loggerConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
