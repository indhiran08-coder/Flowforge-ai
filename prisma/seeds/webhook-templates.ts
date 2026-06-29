import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: webhook-templates
async function seed() {
  console.log('Seeding webhook-templates...')
  await prisma.$disconnect()
}
seed().catch(console.error)
