import { Field, ID, ObjectType } from "type-graphql";

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
}
