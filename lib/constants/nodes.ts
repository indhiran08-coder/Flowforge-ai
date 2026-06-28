export const NODE_TYPES = { MANUAL:'manual-trigger', WEBHOOK:'webhook-trigger', SCHEDULE:'schedule', HTTP:'http-request', EMAIL:'send-email', AI:'ai-chat', CODE:'code', IF:'if-condition', FILTER:'filter', LOOP:'loop', DELAY:'delay', VARS:'set-variables', OUTPUT:'output' } as const
export const TRIGGER_NODES = ['manual-trigger','webhook-trigger','schedule'] as const
export const MAX_NODES = 50
