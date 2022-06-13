import { AuthenticationError } from "apollo-server";
import { AuthChecker } from "type-graphql";
import jwt_decode from "jwt-decode";
import { ContextProps } from "../types/context";

interface FirebaseUserJwtToken {
  name: string;
  picture: string;
  user_id: string;
  exp: number;
  email: string;
}

export function verifyToken(token?: string): boolean {
  if (!token) {
    throw new AuthenticationError("The auth token has not sended");
  }

  const decodedToken: FirebaseUserJwtToken = jwt_decode(token!);

  if (!decodedToken) {
    throw new AuthenticationError("Invalid Token");
  }

  if (Date.now() > decodedToken.exp * 1000) {
    throw new AuthenticationError("Token has been expired");
  }

  return true;
}

export function decodeToken(token: string): FirebaseUserJwtToken {
  const decodedToken: FirebaseUserJwtToken = jwt_decode(token!);

  return decodedToken;
}

export const customAuthChecker: AuthChecker<ContextProps> = ({ context }) => {
  const token = verifyToken(context.req.headers.authorization);

  return token;
};
