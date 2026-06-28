import { parseBool, parseNum, parseJson } from '@/lib/utils/parse'
describe('parseBool', () => { it('true',()=>expect(parseBool('true')).toBe(true)); it('false',()=>expect(parseBool('false')).toBe(false)) })
describe('parseNum',  () => { it('num',()=>expect(parseNum('42')).toBe(42)); it('nan',()=>expect(parseNum('x',-1)).toBe(-1)) })
describe('parseJson', () => { it('obj',()=>expect(parseJson(JSON.stringify({a:1}),null)).toEqual({a:1})) })
