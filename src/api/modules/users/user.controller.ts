import { JsonController, Get, QueryParam, Param } from "routing-controllers";

import type { UserPayload } from "./serializers/user.payload";
import { CURRENT_USER } from "./constants";
import { UserService } from "./user.service";

@JsonController("/users")
export class UserController {
  @Get("/current")
  async getCurrentUser(): Promise<UserPayload> {
    return UserService.getById(CURRENT_USER.id);
  }

  @Get("/:id")
  async getUser(@Param("id") id: number): Promise<UserPayload> {
    return UserService.getById(+id);
  }

  @Get("/")
  async getFilteredUsers(
    @QueryParam("name", { type: String }) name: string,
    @QueryParam("skip", { type: Number }) skip?: number,
    @QueryParam("take", { type: Number }) take?: number,
  ): Promise<{ count: number, users: UserPayload[] }> {
    const {users, count } = UserService.getMany({ name, skip, take });
    const [ listOfUsers, countOfUsers ] =  await Promise.all([users, count]);
    return { users: listOfUsers, count: countOfUsers}
  }
}
