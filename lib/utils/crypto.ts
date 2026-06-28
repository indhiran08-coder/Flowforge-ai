import { createHash, createHmac, randomBytes } from 'crypto'
export const sha256   = (d: string) => createHash('sha256').update(d).digest('hex')
export const hmac256  = (d: string, s: string) => createHmac('sha256',s).update(d).digest('hex')
export const token    = (n=32) => randomBytes(n).toString('hex')
export const apiKey   = (p='ffa') => p+'_'+randomBytes(24).toString('base64url')
