import { resolve, extract } from '@/lib/utils/template'
describe('resolve', () => {
  it('replaces', ()=>expect(resolve('Hi {{ name }}',{name:'World'})).toBe('Hi World'))
  it('unknown',  ()=>expect(resolve('{{ x }}',{})).toBe('{{ x }}'))
})
describe('extract', () => { it('finds', ()=>expect(extract('{{ a }} {{ b }}')).toEqual(['a','b'])) })
