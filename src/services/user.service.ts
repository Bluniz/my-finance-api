import { Inject, Service } from "typedi";
import { PrismaService } from "../database/prisma/prisma.service";
import { ObjectID } from "bson";

interface CreateUserParams {
  name: string;
  email: string;
}

@Service()
export class UserService {
  constructor(@Inject("PRISMA_SERVICE") private prisma: PrismaService) {}

  async createUser({ name, email }: CreateUserParams) {
    return this.prisma.user.create({
      data: {
        id: new ObjectID().toString(),
        name,
        email,
      },
    });
  }
}
