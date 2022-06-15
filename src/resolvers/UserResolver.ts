import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { User } from "../models/User";
import { Inject, Service } from "typedi";
import { UserService } from "../services/user.service";
import { CreateUserInput } from "../inputs/create-user-input";
import { CurrentUser } from "../guards/current-user";
import { DecodedUserProps } from "../types/user";
import { WalletService } from "../services/wallet.service";

@Resolver(() => User)
@Service() //! Torna a classe injetavel pelo typedi
export class UserResolver {
  constructor(
    @Inject("USER_SERVICE") private userService: UserService,
    @Inject("WALLET_SERVICE") private walletService: WalletService
  ) {}

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

  @FieldResolver()
  wallets(@Root() user: User) {
    console.log("user", user);
    return this.walletService.getAllWalletsByUserId(user.id);
  }
}
