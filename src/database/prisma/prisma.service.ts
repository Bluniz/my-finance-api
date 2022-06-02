import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  async connect() {
    await this.$connect();
  }

  async disconnect() {
    await this.$disconnect();
  }

  async enableShutdownHooks() {
    this.$on("beforeExit", async () => {
      await this.disconnect();
    });
  }
}
