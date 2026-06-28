import { sortByField, toggleSort } from '@/types/sort'
const items = [{n:'Charlie'},{n:'Alice'},{n:'Bob'}]
describe('sortByField', () => {
  it('asc',  ()=>expect(sortByField(items,'n','asc')[0].n).toBe('Alice'))
  it('desc', ()=>expect(sortByField(items,'n','desc')[0].n).toBe('Charlie'))
})
describe('toggleSort', () => { it('asc->desc',()=>expect(toggleSort('asc')).toBe('desc')) })
