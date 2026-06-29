// Mock factory for users
export const mockUsers = {
  create: (overrides = {}) => ({
    id: 'mock-' + Math.random().toString(36).slice(2,8),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    ...overrides,
  }),
  list: (n = 3) => Array.from({ length: n }, (_, i) => mockUsers.create({ id: 'mock-'+i })),
}
