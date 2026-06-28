export type CredentialType = 'API_KEY' | 'OAUTH2' | 'BASIC_AUTH' | 'BEARER_TOKEN' | 'CUSTOM'
export interface Credential { id: string; name: string; type: CredentialType; createdAt: Date }
export interface CreateCredentialInput { name: string; type: CredentialType; value: string }
