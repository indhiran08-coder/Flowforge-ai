// posthog config for FlowForge AI
export const posthogConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
