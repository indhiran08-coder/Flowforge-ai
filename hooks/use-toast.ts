'use client'
import { useState, useCallback } from 'react'
export type ToastVariant = 'success'|'error'|'warning'|'info'
export interface Toast { id: string; message: string; variant: ToastVariant }
export function useToasts() {
  const [toasts, set] = useState<Toast[]>([])
  const add = useCallback((message: string, variant: ToastVariant='info', ms=4000)=>{ const id=Math.random().toString(36).slice(2); set(t=>[...t,{id,message,variant}]); setTimeout(()=>set(t=>t.filter(x=>x.id!==id)),ms) },[])
  return { toasts, success:(m:string)=>add(m,'success'), error:(m:string)=>add(m,'error'), info:(m:string)=>add(m,'info') }
}
