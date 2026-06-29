// stripe config for FlowForge AI
export const stripeConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
