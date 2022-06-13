import { Inject, Service } from "typedi";
import { PrismaService } from "../database/prisma/prisma.service";
import { ObjectID } from "bson";

interface CreateCategoryParams {
  name: string;
}

@Service()
export class CategoryService {
  constructor(@Inject("PRISMA_SERVICE") private prisma: PrismaService) {}

  async createCategory({ name }: CreateCategoryParams) {
    const categoryWithSameName = await this.prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (categoryWithSameName) {
      throw new Error("Already exists a category with the same name");
    }

    return this.prisma.category.create({
      data: {
        id: new ObjectID().toString(),
        name,
      },
    });
  }

  async getCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async getCategoryByName(name: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async getAllCategories() {
    return this.prisma.category.findMany();
  }
}
