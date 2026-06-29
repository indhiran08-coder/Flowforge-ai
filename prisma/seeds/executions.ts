import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: executions
async function seed() {
  console.log('Seeding executions...')
  await prisma.$disconnect()
}
seed().catch(console.error)
