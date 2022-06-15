import { Field, InputType } from "type-graphql";

@InputType()
export class CreateWalletInput {
  @Field()
  name: string;
  @Field()
  dueDate: number;
}
