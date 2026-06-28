export const truncate = (s: string, n: number, e='...') => s.length<=n?s:s.slice(0,n-e.length)+e
export const capitalize = (s: string) => s?s[0].toUpperCase()+s.slice(1).toLowerCase():''
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
export const mask = (s: string, v=4) => s.length<=v?'****':'*'.repeat(s.length-v)+s.slice(-v)
export const genId = (p='') => { const id=Math.random().toString(36).slice(2,10); return p?p+'-'+id:id }
