export interface PlanFeature { label: string; included: boolean; limit?: number|string }
export interface Plan { id: string; name: string; price: number; interval: 'month'|'year'; stripePriceId: string; features: PlanFeature[] }
export interface CheckoutSession { url: string; sessionId: string }
