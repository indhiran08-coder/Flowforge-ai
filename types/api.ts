export interface ApiResponse<T = unknown> { data: T; error?: string }
export interface PaginatedResponse<T> { items: T[]; total: number; page: number; hasMore: boolean }
export interface PaginationParams { page?: number; pageSize?: number }
