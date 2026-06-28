'use client'
import { useState, useEffect } from 'react'
export function useLocalStorage<T>(key: string, def: T) {
  const [v, setV] = useState<T>(()=>{ if(typeof window==='undefined')return def; try{const s=localStorage.getItem(key);return s?JSON.parse(s):def}catch{return def} })
  useEffect(()=>{ try{localStorage.setItem(key,JSON.stringify(v))}catch{} },[key,v])
  return [v, setV] as const
}
