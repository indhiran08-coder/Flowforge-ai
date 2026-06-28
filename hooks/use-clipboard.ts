'use client'
import { useState, useCallback } from 'react'
export function useClipboard(ms=2000) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async(text: string)=>{ try{ await navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),ms); return true }catch{ return false } },[ms])
  return { copied, copy }
}
