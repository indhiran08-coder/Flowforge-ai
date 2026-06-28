'use client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
export function TooltipWrapper({children,content,side='top',delay=300}:{children:React.ReactNode;content:React.ReactNode;side?:'top'|'bottom'|'left'|'right';delay?:number}) {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
