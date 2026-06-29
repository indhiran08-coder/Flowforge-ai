import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: onboarding-flows
async function seed() {
  console.log('Seeding onboarding-flows...')
  await prisma.$disconnect()
}
seed().catch(console.error)
