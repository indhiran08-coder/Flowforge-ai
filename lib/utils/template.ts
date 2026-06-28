const RE = /\{\{\s*([\w.]+)\s*\}\}/g
const get = (o: Record<string,unknown>, p: string): unknown => p.split('.').reduce<unknown>((a,k)=>a&&typeof a==='object'?(a as Record<string,unknown>)[k]:undefined,o)
export const resolve = (t: string, ctx: Record<string,unknown>) => t.replace(RE,(_,p)=>{ const v=get(ctx,p); return v!=null?(typeof v==='object'?JSON.stringify(v):String(v)):_ })
export const extract = (t: string) => [...new Set([...t.matchAll(RE)].map(m=>m[1]))]
