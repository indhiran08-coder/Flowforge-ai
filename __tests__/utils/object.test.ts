import { pick, omit, isEmpty } from '@/lib/utils/object'
describe('pick',    () => { it('picks',()=>expect(pick({a:1,b:2,c:3},['a','c'])).toEqual({a:1,c:3})) })
describe('omit',    () => { it('omits',()=>expect(omit({a:1,b:2,c:3},['b'])).toEqual({a:1,c:3})) })
describe('isEmpty', () => { it('empty',()=>expect(isEmpty({})).toBe(true)); it('not',()=>expect(isEmpty({a:1})).toBe(false)) })
