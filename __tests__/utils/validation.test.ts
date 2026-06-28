import { isUrl, isEmail, isJson } from '@/lib/utils/validation'
describe('isUrl',  () => { it('valid',()=>expect(isUrl('https://x.com')).toBe(true)); it('bad',()=>expect(isUrl('bad')).toBe(false)) })
describe('isEmail',() => { it('valid',()=>expect(isEmail('a@b.com')).toBe(true)); it('bad',()=>expect(isEmail('bad')).toBe(false)) })
describe('isJson', () => { it('valid',()=>expect(isJson('{}')).toBe(true)); it('bad',()=>expect(isJson('{bad')).toBe(false)) })
