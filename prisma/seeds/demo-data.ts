import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: demo-data
async function seed() {
  console.log('Seeding demo-data...')
  await prisma.$disconnect()
}
seed().catch(console.error)
