// sentry config for FlowForge AI
export const sentryConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
