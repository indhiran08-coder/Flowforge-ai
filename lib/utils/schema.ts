export const required = (f: string) => ({ validate: (v: unknown) => (v&&String(v).trim())||f+' is required' })
export const urlField  = () => ({ validate: (v: unknown) => { if(!v)return true; try{new URL(String(v));return true}catch{return 'Must be a valid URL'} } })
export const emailField= () => ({ validate: (v: unknown) => !v||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v))||'Must be a valid email' })
