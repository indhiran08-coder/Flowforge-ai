export const clamp   = (v: number, mn: number, mx: number) => Math.min(Math.max(v,mn),mx)
export const roundTo = (v: number, d: number) => Math.round(v*10**d)/10**d
export const sum     = (a: number[]) => a.reduce((s,n)=>s+n,0)
export const avg     = (a: number[]) => a.length?sum(a)/a.length:0
const MS: Record<string,number> = {seconds:1000,minutes:60000,hours:3600000}
export const toMs    = (v: number, u: 'seconds'|'minutes'|'hours') => v*MS[u]
