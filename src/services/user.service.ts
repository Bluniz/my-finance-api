import { Inject, Service } from "typedi";
import { PrismaService } from "../database/prisma/prisma.service";
import { ObjectID } from "bson";

interface CreateUserParams {
  name: string;
  email: string;
  firebaseId: string;
}

@Service()
export class UserService {
  constructor(@Inject("PRISMA_SERVICE") private prisma: PrismaService) {}

  async createUser({ name, email, firebaseId }: CreateUserParams) {
    const userWithSameId = await this.prisma.user.findUnique({
      where: {
        firebaseId,
      },
    });

    if (userWithSameId) {
      throw new Error("Already exists a user with the same ID");
    }

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        firebaseId,
      },
    });

    if (userWithSameEmail) {
      throw new Error("Already exists a user with the same email");
    }

    return this.prisma.user.create({
      data: {
        id: new ObjectID().toString(),
        name,
        email,
        firebaseId,
      },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByFireaseId(firebaseId: string) {
    return this.prisma.user.findUnique({
      where: {
        firebaseId,
      },
    });
  }
}
