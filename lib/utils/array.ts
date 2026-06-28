export const unique = <T>(a: T[]) => [...new Set(a)]
export const groupBy = <T>(a: T[], k: keyof T) => a.reduce((g,i)=>({...g,[String(i[k])]:[...(g[String(i[k])]??[]),i]}),{} as Record<string,T[]>)
export const chunk = <T>(a: T[], n: number) => Array.from({length:Math.ceil(a.length/n)},(_,i)=>a.slice(i*n,i*n+n))
export const last = <T>(a: T[]) => a[a.length-1]
