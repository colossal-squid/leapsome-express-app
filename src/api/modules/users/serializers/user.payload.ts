import { Expose } from "class-transformer";

export class UserPayload {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  avatar: string;

  constructor(partial: Partial<UserPayload>) {
    Object.assign(this, partial);
  }
}
