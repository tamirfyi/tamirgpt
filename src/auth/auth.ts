import prisma from '../../prisma/prismaClient';

export const findOrCreateUser = async (id?: number) => {
  if (!id) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        id: id,
      },
    });
    console.log(`Created new user: ${newUser.id}`);

    return newUser;
  }
};
