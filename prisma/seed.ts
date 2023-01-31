import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const randomIntFromInterval = (min = 0, max = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const currentUser = {
  id: 1,
  firstName: "Thomas",
  lastName: "Anderson",
  avatar: "https://a.wattpad.com/useravatar/_phaedra_.256.677632.jpg",
};

async function main() {
  // clean data
  await prisma.feedback.deleteMany();
  await prisma.user.deleteMany();

  // seed data
  await seedUsers();
  await seedFeedback();
}

async function seedUsers() {
  await prisma.user.deleteMany();

  const users = [currentUser];
  for (let id = 2; id <= 5000; id++) {
    users.push({
      id,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar(),
    });
  }

  await prisma.user.createMany({
    data: users,
  });

  return users;
}

async function seedFeedback() {
  const maxUserId = 5000;

  const feedbackTargets = Array.from(Array(1000).keys()).map(() => {
    return {
      authorId: randomIntFromInterval(1, maxUserId),
      receivers: Array.from(Array(randomIntFromInterval(1, 10)).keys()).map(() => randomIntFromInterval(1, maxUserId)),
    };
  });

  for (const target of feedbackTargets) {
    await prisma.feedback.create({
      data: {
        title: faker.lorem.lines(randomIntFromInterval(1, 5)),
        body: faker.hacker.phrase(),
        author: { connect: { id: target.authorId } },
        receivers: {
          connect: target.receivers.map((id) => ({
            id,
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
