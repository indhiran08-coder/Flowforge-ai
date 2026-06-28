export const fmt = (d: Date|string) => new Date(d).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})
export const fmtDt = (d: Date|string) => new Date(d).toLocaleString('en-US',{dateStyle:'medium',timeStyle:'short'})
export const fmtDur = (ms: number) => ms<1000?ms+'ms':ms<60000?(ms/1000).toFixed(1)+'s':(ms/60000).toFixed(1)+'m'
export const isToday = (d: Date|string) => new Date(d).toDateString()===new Date().toDateString()
export const ago = (d: Date|string) => { const s=Math.floor((Date.now()-+new Date(d))/1000); return s<60?s+'s ago':s<3600?Math.floor(s/60)+'m ago':Math.floor(s/3600)+'h ago' }
