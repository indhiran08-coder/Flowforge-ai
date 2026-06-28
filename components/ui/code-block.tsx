'use client'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
export function CodeBlock({code,language='text'}:{code:string;language?:string}) {
  const [copied,setCopied]=useState(false)
  const copy=async()=>{await navigator.clipboard.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),2000)}
  return (
    <div className='relative rounded-lg bg-muted'>
      <div className='flex items-center justify-between px-4 py-2 border-b text-xs text-muted-foreground'>
        <span>{language}</span>
        <button onClick={copy}>{copied?<Check className='h-3 w-3'/>:<Copy className='h-3 w-3'/>}</button>
      </div>
      <pre className='overflow-x-auto p-4 text-sm'><code>{code}</code></pre>
    </div>
  )
}
