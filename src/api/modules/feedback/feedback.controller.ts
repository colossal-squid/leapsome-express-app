import { JsonController, Get, Post, Body, QueryParam, Param, NotFoundError } from "routing-controllers";

import type { FeedbackCreateDto } from "./dtos/feedback-create.dto";
import type { FeedbackPayload } from "./serializers/feedback.payload";

import { FeedbackService } from "./feedback.service";
import { CURRENT_USER } from "../users/constants";

@JsonController("/feedback")
export class FeedbackController {
  @Get("/")
  async getFeedbacks(
    @QueryParam("skip", { type: Number }) skip?: number,
    @QueryParam("take", { type: Number }) take?: number,
    @QueryParam("by", { type: Number }) author?: number,
    @QueryParam("for", { type: Number }) receiver?: number,
  ): Promise<FeedbackPayload[]> {
    // I assume i don't need to query with both "by" and "for" at the same time
    if (author && receiver) {
      throw new Error('You can only pass either "by" or "for"');
    }
    if (author) {
      return FeedbackService.getManyByUser({ skip, take, userId: author })
    } else if (receiver) {
      return FeedbackService.getManyForUser({ skip, take, userId: receiver })
    } else {
      return FeedbackService.getMany({ skip, take });
    }
  }

  @Get("/:id")
  async getFeedback(@Param("id") id: number): Promise<FeedbackPayload> {
    const feedback = await FeedbackService.getById(+id);

    if (!feedback) {
      throw new NotFoundError();
    }

    return feedback;
  }

  @Post("/")
  create(@Body() input: FeedbackCreateDto): Promise<FeedbackPayload> {
    return FeedbackService.createOne(input, CURRENT_USER.id);
  }
}
