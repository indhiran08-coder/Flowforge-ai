'use client'
import { useMemo } from 'react'
const CATS = { triggers:['manual-trigger','webhook-trigger','schedule'], actions:['http-request','send-email','ai-chat','code','output'], logic:['if-condition','filter','loop','delay','set-variables'] }
export function useNodeCategories(search='') {
  return useMemo(()=>{ if(!search.trim())return CATS; const q=search.toLowerCase(); return Object.fromEntries(Object.entries(CATS).map(([c,ns])=>[c,ns.filter(n=>n.includes(q))]).filter(([,ns])=>ns.length>0)) },[search])
}
