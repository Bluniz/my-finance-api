import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { PurchaseFormat } from "../enums/purchaseFormat";
import { Category } from "./Category";
import { CreditCard } from "./CreditCard";

registerEnumType(PurchaseFormat, {
  name: "PurchaseFormat",
  description: "Available options for buy",
});

@ObjectType("Purchase")
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  price: string;

  @Field(() => PurchaseFormat)
  format: PurchaseFormat;

  @Field(() => CreditCard)
  creditCard: CreditCard;
  creditCardId: string;

  @Field(() => Category)
  category: Category;
  categoryId: string;
}
