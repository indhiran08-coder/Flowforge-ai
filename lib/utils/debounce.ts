// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...a: any[])=>any>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout>
  return (...a: Parameters<T>) => { clearTimeout(t); t=setTimeout(()=>fn(...a),ms) }
}
