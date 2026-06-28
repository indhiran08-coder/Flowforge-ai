import { fmtBytes, fmtNum, fmtPct } from '@/lib/utils/format'
describe('fmtBytes', () => { it('0',()=>expect(fmtBytes(0)).toBe('0 B')); it('KB',()=>expect(fmtBytes(1024)).toContain('KB')) })
describe('fmtNum',   () => { it('commas',()=>expect(fmtNum(1000000)).toBe('1,000,000')) })
describe('fmtPct',   () => { it('25%',()=>expect(fmtPct(1,4)).toBe('25%')); it('zero',()=>expect(fmtPct(5,0)).toBe('0%')) })
