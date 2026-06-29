import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: workflows
async function seed() {
  console.log('Seeding workflows...')
  await prisma.$disconnect()
}
seed().catch(console.error)
