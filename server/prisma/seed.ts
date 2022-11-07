import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatarUrl: 'https://github.com/bfukumori.png',
      googleId: 'bkbjkd463a4d65as4d',
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.476Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-04T18:00:00.476Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                poolId: pool.id,
                userId: user.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
