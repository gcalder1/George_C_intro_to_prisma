const { PrismaClient } = require('../generated/prisma');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.scientist.deleteMany();
  await prisma.team.deleteMany();
  await prisma.review.deleteMany();

  
 
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });