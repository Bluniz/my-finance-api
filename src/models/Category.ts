import { Field, ID, ObjectType } from "type-graphql";

@ObjectType("Category")
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
