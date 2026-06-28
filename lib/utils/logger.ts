type L='debug'|'info'|'warn'|'error'
const log=(l:L,m:string,ctx?:unknown)=>{
  const e={level:l,message:m,context:ctx,timestamp:new Date().toISOString()}
  process.env.NODE_ENV==='development'?console.log('['+l.toUpperCase()+'] '+m,ctx??''):console.log(JSON.stringify(e))
}
export const logger={debug:(m:string,c?:unknown)=>log('debug',m,c),info:(m:string,c?:unknown)=>log('info',m,c),warn:(m:string,c?:unknown)=>log('warn',m,c),error:(m:string,c?:unknown)=>log('error',m,c)}
