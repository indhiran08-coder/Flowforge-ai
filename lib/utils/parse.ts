export const parseBool = (v: unknown) => typeof v==='boolean'?v:typeof v==='string'?['true','1','yes'].includes(v.toLowerCase()):Boolean(v)
export const parseNum  = (v: unknown, fb=0) => { const n=Number(v); return isNaN(n)?fb:n }
export const parseJson = <T>(s: string, fb: T) => { try{return JSON.parse(s) as T}catch{return fb} }
