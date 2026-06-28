export interface HttpRequestConfig { url: string; method: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'; headers?: Record<string,string> }
export interface AiChatConfig { model: string; prompt: string; temperature?: number }
export interface SendEmailConfig { to: string; subject: string; body: string }
export interface DelayConfig { duration: number; unit: 'seconds'|'minutes'|'hours' }
