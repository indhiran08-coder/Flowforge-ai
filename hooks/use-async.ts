'use client'
import { useState, useCallback } from 'react'
export function useAsync<T, A extends unknown[]>(fn: (...a: A) => Promise<T>) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T|null>(null)
  const [error, setError] = useState<string|null>(null)
  const execute = useCallback(async(...args: A) => { setLoading(true); setError(null); try{ const r=await fn(...args); setData(r); return r }catch(e){ setError((e as Error).message); throw e }finally{ setLoading(false) } },[fn])
  return { loading, data, error, execute }
}
