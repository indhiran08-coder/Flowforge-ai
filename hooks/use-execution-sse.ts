'use client'
import { useState, useEffect, useCallback } from 'react'
// useExecutionSSE custom React hook
export function useExecutionSSE() {
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
