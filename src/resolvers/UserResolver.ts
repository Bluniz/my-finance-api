import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import crypto from "crypto";
import { Inject, Service } from "typedi";
import { UserService } from "../services/user.service";
import { CreateUserInput } from "../inputs/create-user-input";

@Resolver(() => User)
@Service() //! Torna a classe injetavel pelo typedi
export class UserResolver {
  constructor(@Inject("USER_SERVICE") private userService: UserService) {}

  @Query(() => String)
  me() {
    return "ata";
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user = await this.userService.createUser({
      name: data.name,
      email: data.email,
    });
    return user;
  }
}
