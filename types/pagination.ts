export interface CursorPaginationInput { cursor?: string; limit?: number }
export interface CursorPaginationResult<T> { items: T[]; nextCursor?: string; hasNextPage: boolean }
export interface OffsetPaginationInput { page: number; pageSize: number }
export interface OffsetPaginationResult<T> { items: T[]; total: number; totalPages: number }
