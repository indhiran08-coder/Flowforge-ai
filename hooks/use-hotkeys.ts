'use client'
import { useState, useEffect, useCallback } from 'react'
// useHotkeys custom React hook
export function useHotkeys() {
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
