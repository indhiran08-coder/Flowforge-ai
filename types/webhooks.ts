export interface WebhookPayload { workflowId: string; data: Record<string,unknown>; headers: Record<string,string>; timestamp: string }
export interface WebhookTriggerResult { executionId: string; status: 'ACCEPTED'; message: string }
export interface WebhookConfig { url: string; secret?: string }
