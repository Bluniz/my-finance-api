import { Field, ID, ObjectType } from "type-graphql";
import { Purchase } from "./Purchase";

@ObjectType("User")
export class User {
  @Field((_type) => ID)
  id: string;

  @Field()
  firebaseId: String;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  dueDate?: number;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
