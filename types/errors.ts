export class AppError extends Error {
  constructor(public message: string, public code: string, public statusCode = 500) { super(message) }
}
export class NotFoundError extends AppError { constructor(r: string) { super(r + ' not found', 'NOT_FOUND', 404) } }
export class UnauthorizedError extends AppError { constructor() { super('Unauthorized', 'UNAUTHORIZED', 401) } }
export class ValidationError extends AppError { constructor(m: string) { super(m, 'VALIDATION_ERROR', 400) } }
