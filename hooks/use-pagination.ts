'use client'
import { useState } from 'react'
export function usePagination({page:init=1,pageSize=10,total=0}={}) {
  const [page, setPage] = useState(init)
  const pages = Math.ceil(total/pageSize)
  return { page, pageSize, totalPages:pages, hasNext:page<pages, hasPrev:page>1,
    goTo:(p:number)=>setPage(Math.max(1,Math.min(p,pages))),
    next:()=>page<pages&&setPage(p=>p+1), prev:()=>page>1&&setPage(p=>p-1) }
}
