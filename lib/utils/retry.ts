export const sleep = (ms: number) => new Promise<void>(r=>setTimeout(r,ms))
export async function withRetry<T>(fn: ()=>Promise<T>, max=3, delay=1000): Promise<T> {
  let last!: Error
  for(let i=1;i<=max;i++) { try { return await fn() } catch(e) { last=e as Error; if(i<max) await sleep(delay*2**(i-1)) } }
  throw last
}
export const withTimeout = <T>(p: Promise<T>, ms: number) => Promise.race([p, new Promise<never>((_,r)=>setTimeout(()=>r(new Error('Timeout '+ms+'ms')),ms))])
