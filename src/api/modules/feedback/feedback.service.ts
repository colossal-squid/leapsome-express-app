import sanitizeHtml from "sanitize-html";

import type { FeedbackCreateDto } from "./dtos/feedback-create.dto";

import { prisma } from "./../../utils/db";
import { FEEDBACK_DATA_SELECTOR } from "./constants";

export class FeedbackService {
  static getById(id: number) {
    return prisma.feedback.findUnique({
      where: {
        id,
      },
      select: FEEDBACK_DATA_SELECTOR,
    });
  }

  static getMany({ skip = 0, take = 50 }: { skip?: number; take?: number }) {
    return prisma.feedback.findMany({
      select: FEEDBACK_DATA_SELECTOR,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  static getManyForUser({ skip = 0, take = 50, userId }: { skip?: number; take?: number, userId?: number }) {
    return prisma.feedback.findMany({
      select: FEEDBACK_DATA_SELECTOR,
      where: {
        receivers: {
          some: {
            id: userId
          }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  static getManyByUser({ skip = 0, take = 50, userId }: { skip?: number; take?: number, userId?: number }) {
    return prisma.feedback.findMany({
      select: FEEDBACK_DATA_SELECTOR,
      where: {
        author: {
          id: userId
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  static createOne(input: FeedbackCreateDto, authorId: number) {
    return prisma.feedback.create({
      data: {
        title: sanitizeHtml(input.title, { allowedTags: [] }),
        body: sanitizeHtml(input.body),
        receivers: {
          connect: input.receiverIds.map((id) => ({ id })),
        },
        authorId,
      },
      select: FEEDBACK_DATA_SELECTOR,
    });
  }
}
