import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: sample-credentials
async function seed() {
  console.log('Seeding sample-credentials...')
  await prisma.$disconnect()
}
seed().catch(console.error)
