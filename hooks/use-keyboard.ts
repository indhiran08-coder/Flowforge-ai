'use client'
import { useEffect, useCallback } from 'react'
export function useKeyboard(bindings: Record<string,()=>void>, active=true) {
  const handler = useCallback((e: KeyboardEvent)=>{
    if(!active)return
    for(const[combo,fn] of Object.entries(bindings)){
      const p=combo.toLowerCase().split('+')
      if(e.key.toLowerCase()===p.at(-1)&&e.ctrlKey===p.includes('ctrl')){e.preventDefault();fn()}
    }
  },[bindings,active])
  useEffect(()=>{window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler)},[handler])
}
