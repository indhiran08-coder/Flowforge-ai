export const isUrl   = (s: string) => { try { new URL(s); return true } catch { return false } }
export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
export const isJson  = (s: string) => { try { JSON.parse(s); return true } catch { return false } }
export const isCron  = (s: string) => s.trim().split(/\s+/).length===5
