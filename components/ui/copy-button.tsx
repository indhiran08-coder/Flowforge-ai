'use client'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
export function CopyButton({value,className}:{value:string;className?:string}) {
  const [ok,setOk]=useState(false)
  const copy=async()=>{await navigator.clipboard.writeText(value);setOk(true);setTimeout(()=>setOk(false),2000)}
  return <Button size='sm' variant='ghost' onClick={copy} className={className}>{ok?<Check className='h-4 w-4 text-green-400'/>:<Copy className='h-4 w-4'/>}</Button>
}
