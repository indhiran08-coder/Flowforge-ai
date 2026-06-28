import { clamp, roundTo, sum, avg } from '@/lib/utils/number'
describe('clamp',  () => { it('min',()=>expect(clamp(-5,0,10)).toBe(0)); it('max',()=>expect(clamp(15,0,10)).toBe(10)) })
describe('roundTo',() => { it('2dp',()=>expect(roundTo(3.14159,2)).toBe(3.14)) })
describe('sum',    () => { it('sums',()=>expect(sum([1,2,3])).toBe(6)) })
describe('avg',    () => { it('avg', ()=>expect(avg([2,4,6])).toBe(4)) })
