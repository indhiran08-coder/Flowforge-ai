// webhooks config for FlowForge AI
export const webhooksConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
