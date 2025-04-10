import { PrismaClient } from '@prisma/index';

// Prisma Type 추론 관련 에러 수정
// https://velog.io/@pyo-sh/Yarn-Berry-%ED%99%98%EA%B2%BD%EA%B3%BC-PnP-%EA%B8%B0%EB%8A%A5%EC%97%90%EC%84%9C-Prisma-%EC%82%AC%EC%9A%A9

// Prisma Extends Soft Delete 관련 글
// https://medium.com/@aminulloh2002/implement-prisma-soft-delete-using-extends-in-nextjs-5b9d230e5c61

const prisma = new PrismaClient().$extends({
  name: 'deletedAt',
  model: {
    // usersOnMeets: {
    //   async delete({ where }) {
    //     return prisma.usersOnMeets.update({
    //       where: {
    //         ...where,
    //       },
    //       data: {
    //         deletedAt: new Date(),
    //       },
    //     });
    //   },
    //   async deleteMany({ where }) {
    //     return prisma.usersOnMeets.updateMany({
    //       where: {
    //         ...where,
    //       },
    //       data: {
    //         deletedAt: new Date(),
    //       },
    //     });
    //   },
    // },
  },
});

export default prisma;
