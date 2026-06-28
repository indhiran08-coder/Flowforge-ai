export type SubscriptionPlan = 'FREE'|'PRO'|'ENTERPRISE'
export type SubscriptionStatus = 'ACTIVE'|'CANCELED'|'PAST_DUE'|'TRIALING'
export interface UserSubscription { plan: SubscriptionPlan; status: SubscriptionStatus; cancelAtPeriodEnd: boolean }
