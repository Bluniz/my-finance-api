import { Inject, Service } from "typedi";
import { PrismaService } from "../database/prisma/prisma.service";
import { ObjectID } from "bson";

interface CreateWalletParams {
  name: string;
  dueDate: number;
  userId: string;
}

@Service()
export class WalletService {
  constructor(@Inject("PRISMA_SERVICE") private prisma: PrismaService) {}

  async createWallet({ name, dueDate, userId }: CreateWalletParams) {
    const walletyWithSameName = await this.prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (walletyWithSameName) {
      throw new Error("Already exists a wallet with the same name");
    }

    console.log(walletyWithSameName);
    console.log("opora");

    return this.prisma.wallet.create({
      data: {
        id: new ObjectID().toString(),
        name,
        dueDate,
        userId,
      },
    });
  }

  async getWalletById(id: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        id,
      },
    });

    if (!wallet) {
      throw new Error("Category not found");
    }

    return wallet;
  }

  async getAllWalletsByUserId(userId: string) {
    return this.prisma.wallet.findMany({
      where: {
        userId,
      },
    });
  }
}
