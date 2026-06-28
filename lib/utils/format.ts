export const fmtBytes = (b: number) => { if(!b)return '0 B'; const k=1024,s=['B','KB','MB','GB'],i=Math.floor(Math.log(b)/Math.log(k)); return (b/k**i).toFixed(2)+' '+s[i] }
export const fmtNum  = (n: number) => new Intl.NumberFormat('en-US').format(n)
export const fmtUSD  = (c: number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(c/100)
export const fmtPct  = (v: number, t: number) => t?Math.round(v/t*100)+'%':'0%'
