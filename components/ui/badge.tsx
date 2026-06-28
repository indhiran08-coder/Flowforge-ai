import { cn } from '@/lib/utils'
type V='default'|'success'|'warning'|'error'|'info'
const vs:Record<V,string>={default:'bg-primary/10 text-primary',success:'bg-green-500/10 text-green-400',warning:'bg-amber-500/10 text-amber-400',error:'bg-red-500/10 text-red-400',info:'bg-blue-500/10 text-blue-400'}
export function Badge({children,variant='default',className}:{children:React.ReactNode;variant?:V;className?:string}) { return <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',vs[variant],className)}>{children}</span> }
export function StatusBadge({status}:{status:'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'}) { const m:Record<string,V>={PENDING:'default',RUNNING:'info',COMPLETED:'success',FAILED:'error'}; return <Badge variant={m[status]}>{status}</Badge> }
