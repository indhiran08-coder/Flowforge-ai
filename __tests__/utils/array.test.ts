import { unique, chunk, last } from '@/lib/utils/array'
describe('unique', () => { it('dedupes',()=>expect(unique([1,2,2,3])).toEqual([1,2,3])) })
describe('chunk',  () => { it('chunks', ()=>expect(chunk([1,2,3,4,5],2)).toEqual([[1,2],[3,4],[5]])) })
describe('last',   () => { it('last',   ()=>expect(last([1,2,3])).toBe(3)) })
