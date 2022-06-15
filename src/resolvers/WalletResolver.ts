import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { UserService } from "../services/user.service";
import { CurrentUser } from "../guards/current-user";
import { DecodedUserProps } from "../types/user";
import { Wallet } from "../models/Wallet";
import { WalletService } from "../services/wallet.service";
import { CreateWalletInput } from "../inputs/create-wallet-input";

@Resolver(() => Wallet)
@Service() //! Torna a classe injetavel pelo typedi
export class WalletResolver {
  constructor(
    @Inject("WALLET_SERVICE") private walletService: WalletService,
    @Inject("USER_SERVICE") private userService: UserService
  ) {}

  @Query(() => [Wallet])
  @Authorized()
  async myWallets(@CurrentUser() user: DecodedUserProps) {
    if (!user) {
      throw new Error("Invalid user");
    }

    const wallets = await this.walletService.getAllWalletsByUserId(user.id);

    if (!wallets) {
      throw new Error("An Error has occurred while getting wallets data");
    }

    return wallets;
  }

  @Mutation(() => Wallet)
  @Authorized()
  async createWallet(
    @Arg("data") data: CreateWalletInput,
    @CurrentUser() currentUser: DecodedUserProps
  ) {
    const user = await this.userService.getUserByFireaseId(
      currentUser.firebase_id
    );

    if (!user) {
      throw new Error("Not found user with this firebaseId");
    }

    return this.walletService.createWallet({
      name: data.name,
      dueDate: data.dueDate,
      userId: user.id,
    });
  }
}
