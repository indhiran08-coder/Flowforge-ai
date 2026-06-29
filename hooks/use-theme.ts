'use client'
import { useState, useEffect, useCallback } from 'react'
// useTheme custom React hook
export function useTheme() {
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
