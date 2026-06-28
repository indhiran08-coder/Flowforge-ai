import { debounce } from '@/lib/utils/debounce'
jest.useFakeTimers()
describe('debounce', () => {
  it('delays', ()=>{
    const fn=jest.fn(); const d=debounce(fn,200)
    d(); d(); d()
    expect(fn).not.toHaveBeenCalled()
    jest.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
