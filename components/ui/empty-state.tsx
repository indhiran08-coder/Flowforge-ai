export function EmptyState({ icon,title,description }:{icon?:React.ReactNode;title:string;description?:string}) {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
      {icon&&<div className='mb-4 rounded-full bg-muted p-4'>{icon}</div>}
      <h3 className='text-lg font-semibold'>{title}</h3>
      {description&&<p className='mt-1 max-w-sm text-sm text-muted-foreground'>{description}</p>}
    </div>
  )
}
