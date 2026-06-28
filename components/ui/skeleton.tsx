import { cn } from '@/lib/utils'
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-muted',className)} aria-hidden='true'/>
}
export function CardSkeleton() {
  return <div className='rounded-lg border bg-card p-4 space-y-3'><Skeleton className='h-5 w-3/4'/><Skeleton className='h-4 w-1/2'/></div>
}
