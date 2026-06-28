'use client'
import { useState, useMemo } from 'react'
export function useSearch<T>(items: T[], fn: (i: T, q: string)=>boolean) {
  const [q, setQ] = useState('')
  const results = useMemo(()=>q.trim()?items.filter(i=>fn(i,q.toLowerCase())):items,[items,q,fn])
  return { q, setQ, results, active: q.trim().length>0 }
}
