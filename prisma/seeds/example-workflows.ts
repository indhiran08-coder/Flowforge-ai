import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Seed: example-workflows
async function seed() {
  console.log('Seeding example-workflows...')
  await prisma.$disconnect()
}
seed().catch(console.error)
