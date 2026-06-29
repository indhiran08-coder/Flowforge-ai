import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: pricing-tiers
async function seed() {
  console.log('Seeding pricing-tiers...')
  await prisma.$disconnect()
}
seed().catch(console.error)
