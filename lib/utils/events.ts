const enc = new TextEncoder()
export const sseMsg = (ev: string, d: unknown) => 'event: '+ev+'\ndata: '+(typeof d==='string'?d:JSON.stringify(d))+'\n\n'
export function sseStream() {
  let ctrl: ReadableStreamDefaultController
  const stream = new ReadableStream({ start(c){ctrl=c} })
  return { stream, send:(ev:string,d:unknown)=>ctrl.enqueue(enc.encode(sseMsg(ev,d))), close:()=>{try{ctrl.close()}catch{}} }
}
