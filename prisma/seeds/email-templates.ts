import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: email-templates
async function seed() {
  console.log('Seeding email-templates...')
  await prisma.$disconnect()
}
seed().catch(console.error)
