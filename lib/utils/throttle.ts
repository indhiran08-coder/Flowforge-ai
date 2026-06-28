export function rateLimiter(max: number, windowMs: number) {
  let count=0, start=Date.now()
  return {
    check() { const now=Date.now(); if(now-start>windowMs){count=0;start=now} return ++count<=max },
    remaining() { return Math.max(0,max-count) }
  }
}
