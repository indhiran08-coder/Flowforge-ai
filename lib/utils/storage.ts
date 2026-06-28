export const storageGet = <T>(k: string, d: T): T => { if(typeof window==='undefined')return d; try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d} }
export const storageSet = <T>(k: string, v: T) => { try{localStorage.setItem(k,JSON.stringify(v))}catch{} }
export const storageRemove = (k: string) => { try{localStorage.removeItem(k)}catch{} }
