import { fmtDur, isToday } from '@/lib/utils/date'
describe('fmtDur', () => {
  it('ms', () => expect(fmtDur(500)).toBe('500ms'))
  it('s',  () => expect(fmtDur(2500)).toBe('2.5s'))
  it('m',  () => expect(fmtDur(90000)).toBe('1.5m'))
})
describe('isToday', () => {
  it('now', () => expect(isToday(new Date())).toBe(true))
})
