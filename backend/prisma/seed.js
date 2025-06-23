const { PrismaClient } = require('../generated/prisma');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  /*
  Cleans already made data
  */
  await prisma.scientist.deleteMany();
  await prisma.team.deleteMany();
  await prisma.review.deleteMany();

  /*
  We're creating 5 teams
  */
  for (let teamNum = 0; teamNum < 5; teamNum++) {
    const team = await prisma.team.create({
        data: {
            teamName: `${faker.location.country()}'s ${faker.word.noun()}s`,
            invention: `${faker.animal.type()}-Powered ${faker.commerce.productName()}`,
            description: faker.lorem.paragraph(),
            themeSong: faker.music.songName(),
        },
    });

    /*
    Each team will have 3 scientists per, each has a random role
    */
    for (let scientistRole = 0; scientistRole < 3; scientistRole++) {
        const role = scientistRole == 0 ? "LEAD_SCIENTIST" : scientistRole == 1 ? "ASSISTANT" : "INTERN";

        const scientist = await prisma.scientist.create({
            data: {
                name: faker.person.fullName(),
                role: role,
                location: faker.location.continent(),
                era: faker.date.past(),
                favEmoji: faker.internet.emoji(),
                teamId: team.id,
            },
        });

        /*
        Each scientist within our teams will have an off-brand review
        */
        for (let relpReview = 0; relpReview < 5; relpReview++) {
            await prisma.review.create ({
                data: {
                    reviewerName: faker.person.firstName(),
                    ratingStars: faker.number.int({ min: 1, max: 5}),
                    fromMadSci: faker.datatype.boolean(0.5),
                    reviewDesc: faker.lorem.paragraph(),
                    scientistId: scientist.id,
                },
            });
        }
    }
  }
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