export type NodeCat = 'trigger'|'action'|'logic'|'ai'|'data'
export const NODE_COLORS: Record<NodeCat,{bg:string;text:string}> = {
  trigger:{bg:'bg-violet-500/10',text:'text-violet-400'},
  action: {bg:'bg-blue-500/10',  text:'text-blue-400'},
  logic:  {bg:'bg-amber-500/10', text:'text-amber-400'},
  ai:     {bg:'bg-pink-500/10',  text:'text-pink-400'},
  data:   {bg:'bg-green-500/10', text:'text-green-400'},
}
