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
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error("Already exists a user with the same email");
    }

    return this.prisma.user.create({
      data: {
        id: new ObjectID().toString(),
        name,
        email,
      },
    });
  }
}
