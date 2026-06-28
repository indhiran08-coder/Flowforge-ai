import { withRetry } from '@/lib/utils/retry'
describe('withRetry', () => {
  it('succeeds', async()=>{ const fn=jest.fn().mockResolvedValue('ok'); expect(await withRetry(fn,1,0)).toBe('ok') })
  it('retries',  async()=>{ const fn=jest.fn().mockRejectedValueOnce(new Error('x')).mockResolvedValue('ok'); await withRetry(fn,3,0); expect(fn).toHaveBeenCalledTimes(2) })
  it('throws',   async()=>{ const fn=jest.fn().mockRejectedValue(new Error('!!')); await expect(withRetry(fn,2,0)).rejects.toThrow() })
})
