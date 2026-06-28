export const sanitizeHtml = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
export const sanitizeFilename = (s: string) => s.replace(/[^a-z0-9._-]/gi,'_').slice(0,255)
