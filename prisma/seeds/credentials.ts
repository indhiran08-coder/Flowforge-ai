import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: credentials
async function seed() {
  console.log('Seeding credentials...')
  await prisma.$disconnect()
}
seed().catch(console.error)
