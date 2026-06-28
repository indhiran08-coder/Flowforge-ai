export const baseUrl = () => typeof window!=='undefined'?window.location.origin:process.env.NEXT_PUBLIC_APP_URL??'http://localhost:3000'
export const webhookUrl = (id: string) => baseUrl()+'/api/webhooks/'+id
export const buildUrl = (base: string, p: Record<string,unknown>) => { const u=new URL(base); Object.entries(p).forEach(([k,v])=>v!=null&&u.searchParams.set(k,String(v))); return u.toString() }
export const parseQs = (s: string) => Object.fromEntries(new URLSearchParams(s))
