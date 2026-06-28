'use client'
import { useState, useEffect, useCallback } from 'react'
export function useCredentials() {
  const [data, setData] = useState<unknown[]>([])
  const [loading, setLoading] = useState(true)
  const fetch_ = useCallback(async()=>{ setLoading(true); try{ const r=await fetch('/api/credentials'); const {data:d}=await r.json(); setData(d) }finally{ setLoading(false) } },[])
  useEffect(()=>{ fetch_() },[fetch_])
  return { credentials:data, loading, refetch:fetch_ }
}
