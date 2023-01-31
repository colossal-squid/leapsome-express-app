import { prisma } from "../../utils/db";
import { USER_DATA_SELECTOR } from "./constants";

export class UserService {
  static getById(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: USER_DATA_SELECTOR,
    });
  }

  static getMany({ name, skip = 0, take = 10 }: { name: string; skip?: number; take?: number }) {
    let where = {};

    if (name?.trim().length > 0) {
      where = {
        OR: [
          {
            firstName: {
              contains: name,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: name,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    const users = prisma.user.findMany({
      where,
      select: USER_DATA_SELECTOR,
      orderBy: [
        {
          firstName: "asc",
        },
        {
          lastName: "asc",
        },
      ],
      skip,
      take,
    });
    const count = prisma.user.count();
    return { users, count };
  }
}
