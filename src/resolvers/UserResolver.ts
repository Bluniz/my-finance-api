import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import { Inject, Service } from "typedi";
import { UserService } from "../services/user.service";
import { CreateUserInput } from "../inputs/create-user-input";
import { CurrentUser } from "../guards/current-user";
import { DecodedUserProps } from "../types/user";

@Resolver(() => User)
@Service() //! Torna a classe injetavel pelo typedi
export class UserResolver {
  constructor(@Inject("USER_SERVICE") private userService: UserService) {}

  @Query(() => User)
  @Authorized()
  async me(@CurrentUser() user: DecodedUserProps) {
    if (!user) {
      throw new Error("Invalid user");
    }

    return this.userService.getUserByFireaseId(user.firebase_id);
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user = await this.userService.createUser({
      name: data.name,
      email: data.email,
      firebaseId: data.firebaseId,
    });
    return user;
  }
}
