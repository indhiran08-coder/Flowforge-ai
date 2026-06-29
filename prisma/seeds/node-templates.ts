import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: node-templates
async function seed() {
  console.log('Seeding node-templates...')
  await prisma.$disconnect()
}
seed().catch(console.error)
