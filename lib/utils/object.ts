export const pick = <T extends object,K extends keyof T>(o: T, ks: K[]) => ks.reduce((a,k)=>({...a,[k]:o[k]}),{} as Pick<T,K>)
export const omit = <T extends object,K extends keyof T>(o: T, ks: K[]) => { const r={...o}; ks.forEach(k=>delete r[k]); return r as Omit<T,K> }
export const isEmpty = (o: object) => Object.keys(o).length===0
