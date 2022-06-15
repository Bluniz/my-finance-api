import { Field, ID, ObjectType } from "type-graphql";
import { Purchase } from "./Purchase";

@ObjectType("Wallet")
export class Wallet {
  @Field((_type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  dueDate: number;

  @Field(() => [Purchase])
  purchases: Purchase[];

  @Field()
  userId: string;
}
