import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: users
async function seed() {
  console.log('Seeding users...')
  await prisma.$disconnect()
}
seed().catch(console.error)
