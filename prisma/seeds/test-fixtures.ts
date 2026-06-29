import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: test-fixtures
async function seed() {
  console.log('Seeding test-fixtures...')
  await prisma.$disconnect()
}
seed().catch(console.error)
