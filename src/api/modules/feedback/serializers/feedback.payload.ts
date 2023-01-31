import { Expose, Type } from "class-transformer";
import { UserPayload } from "../../users/serializers/user.payload";

export class FeedbackPayload {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  body!: string;

  @Expose()
  @Type(() => UserPayload)
  author!: UserPayload;

  @Expose()
  @Type(() => UserPayload)
  receivers!: UserPayload[];

  constructor(partial: Partial<FeedbackPayload>) {
    Object.assign(this, partial);
  }
}
