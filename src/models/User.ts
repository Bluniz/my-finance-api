import { Field, ID, ObjectType } from "type-graphql";
import { Wallet } from "./Wallet";

@ObjectType("User")
export class User {
  @Field((_type) => ID)
  id: string;

  @Field()
  firebaseId: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Wallet])
  wallets: Wallet[];
}
