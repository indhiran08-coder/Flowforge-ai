// openai config for FlowForge AI
export const openaiConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
