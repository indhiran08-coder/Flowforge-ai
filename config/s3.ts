// s3 config for FlowForge AI
export const s3Config = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
