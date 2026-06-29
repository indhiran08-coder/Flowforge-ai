// feature-flags config for FlowForge AI
export const feature-flagsConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
} as const
