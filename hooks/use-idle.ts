'use client'
import { useState, useEffect, useCallback } from 'react'
// useIdleDetection custom React hook
export function useIdleDetection() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const refresh = useCallback(async () => {
    setLoading(true)
    setLoading(false)
  }, [])
  useEffect(() => { refresh() }, [refresh])
  return { data, loading, error, refresh }
}
