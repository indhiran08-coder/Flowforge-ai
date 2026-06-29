import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: default-settings
async function seed() {
  console.log('Seeding default-settings...')
  await prisma.$disconnect()
}
seed().catch(console.error)
