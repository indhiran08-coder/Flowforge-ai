import type { Config } from 'jest'
import nextJest from 'next/jest.js'
const config: Config = { coverageProvider: 'v8', testEnvironment: 'node', moduleNameMapper: { '^@/(.*)$': '<rootDir>/' } }
export default nextJest({ dir: './' })(config)
