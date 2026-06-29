import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: plans
async function seed() {
  console.log('Seeding plans...')
  await prisma.$disconnect()
}
seed().catch(console.error)
