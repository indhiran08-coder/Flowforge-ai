import { buildUrl } from '@/lib/utils/url'
describe('buildUrl', () => {
  it('params',  ()=>{ const u=buildUrl('https://x.com',{p:1}); expect(u).toContain('p=1') })
  it('no undef',()=>{ const u=buildUrl('https://x.com',{a:1,b:undefined}); expect(u).not.toContain('b=') })
})
