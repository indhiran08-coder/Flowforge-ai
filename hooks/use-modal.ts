'use client'
import { useState, useCallback } from 'react'
export function useModal(def=false) {
  const [isOpen, set] = useState(def)
  return { isOpen, open: useCallback(()=>set(true),[]), close: useCallback(()=>set(false),[]), toggle: useCallback(()=>set(p=>!p),[]) }
}
