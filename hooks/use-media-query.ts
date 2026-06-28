'use client'
import { useState, useEffect } from 'react'
export function useMediaQuery(q: string) {
  const [m, setM] = useState(false)
  useEffect(()=>{ const mq=window.matchMedia(q); setM(mq.matches); const h=(e:MediaQueryListEvent)=>setM(e.matches); mq.addEventListener('change',h); return ()=>mq.removeEventListener('change',h) },[q])
  return m
}
export const useIsMobile = ()=>useMediaQuery('(max-width: 768px)')
