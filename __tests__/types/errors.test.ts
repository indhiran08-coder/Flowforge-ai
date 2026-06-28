import { AppError, NotFoundError, UnauthorizedError } from '@/types/errors'
describe('AppError',()=>{ it('props',()=>{ const e=new AppError('fail','FAIL',500); expect(e.code).toBe('FAIL'); expect(e.statusCode).toBe(500) }) })
describe('NotFoundError',()=>{ it('404',()=>expect(new NotFoundError('X').statusCode).toBe(404)) })
describe('UnauthorizedError',()=>{ it('401',()=>expect(new UnauthorizedError().statusCode).toBe(401)) })
