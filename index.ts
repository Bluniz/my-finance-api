import "reflect-metadata";

import path from "path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import dotenv from "dotenv";

import { UserResolver } from "./src/resolvers/UserResolver";
import { PrismaService } from "./src/database/prisma/prisma.service";
import { UserService } from "./src/services/user.service";
//? Resolvers
//! São basicamente os controlers que utilizamos no Rest
//! Os resolvers que lidam com as informações que pegamos do backend

dotenv.config();

Container.set({
  id: "PRISMA_SERVICE",
  factory: () => new PrismaService(),
});

Container.set({
  id: "USER_SERVICE",
  factory: () => new UserService(new PrismaService()),
});

async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    container: Container,
  });

  const server = new ApolloServer({ schema });
  const prisma = new PrismaService();

  await prisma.connect().then(() => {
    console.log("Connect with DB");
  });

  server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`);
  });
}

main();