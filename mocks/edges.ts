// Mock factory for edges
export const mockEdges = {
  create: (overrides = {}) => ({
    id: 'mock-' + Math.random().toString(36).slice(2,8),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    ...overrides,
  }),
  list: (n = 3) => Array.from({ length: n }, (_, i) => mockEdges.create({ id: 'mock-'+i })),
}
