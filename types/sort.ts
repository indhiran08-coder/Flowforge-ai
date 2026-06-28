export type SortOrder = 'asc'|'desc'
export function sortByField<T>(items: T[], key: keyof T, order: SortOrder = 'asc'): T[] {
  return [...items].sort((a,b) => { const r = a[key]<b[key]?-1:a[key]>b[key]?1:0; return order==='asc'?r:-r })
}
export const toggleSort = (o: SortOrder): SortOrder => o==='asc'?'desc':'asc'
