import { truncate, capitalize, slugify } from '@/lib/utils/string'
describe('truncate',   () => {
  it('long', ()=>expect(truncate('Hello World',8)).toBe('Hello...'))
  it('short',()=>expect(truncate('Hi',10)).toBe('Hi'))
})
describe('capitalize', () => { it('caps',()=>expect(capitalize('hello')).toBe('Hello')) })
describe('slugify',    () => { it('slug',()=>expect(slugify('Hello World')).toBe('hello-world')) })
