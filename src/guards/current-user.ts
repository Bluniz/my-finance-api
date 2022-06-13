import { createParamDecorator } from "type-graphql";
import { ContextProps } from "../types/context";
import { decodeToken } from "./Auth.guard";

export function CurrentUser() {
  return createParamDecorator<ContextProps>(({ context }) => {
    const decodedToken = decodeToken(context.req.headers.authorization!);

    const user = {
      name: decodedToken.name,
      email: decodedToken.email,
      firebase_id: decodedToken.user_id,
    };

    return user;
  });
}
