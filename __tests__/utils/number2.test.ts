import { toMs } from '@/lib/utils/number'
describe('toMs', () => {
  it('secs', ()=>expect(toMs(1,'seconds')).toBe(1000))
  it('mins', ()=>expect(toMs(1,'minutes')).toBe(60000))
  it('hrs',  ()=>expect(toMs(1,'hours')).toBe(3600000))
})
