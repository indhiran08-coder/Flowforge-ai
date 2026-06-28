export const ROUTES = {
  home:'/', pricing:'/pricing', templates:'/templates',
  dashboard:'/dashboard', workflows:'/dashboard/workflows',
  workflow:(id:string)=>'/dashboard/workflows/'+id,
  executions:'/dashboard/executions', execution:(id:string)=>'/dashboard/executions/'+id,
  settings:'/dashboard/settings', credentials:'/dashboard/settings/credentials',
} as const
