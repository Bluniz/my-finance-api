import { Field, ID, ObjectType } from "type-graphql";

@ObjectType("CreditCard")
export class CreditCard {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  dueDate: number;
}
