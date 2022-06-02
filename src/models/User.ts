import { Field, ID, ObjectType } from "type-graphql";
import { CreditCard } from "./CreditCard";
import { Purchase } from "./Purchase";

@ObjectType("User")
export class User {
  @Field((_type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [CreditCard])
  creditCards: CreditCard[];

  @Field(() => [Purchase])
  purchases: Purchase[];
}
