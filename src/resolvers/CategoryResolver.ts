import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";

import { CategoryService } from "../services/category.service";
import { Category } from "../models/Category";
import { CreateCategoryInput } from "../inputs/create-category-input";

@Resolver(() => Category)
@Service() //! Torna a classe injetavel pelo typedi
export class CategoryResolver {
  constructor(
    @Inject("CATEGORY_SERVICE") private categoryService: CategoryService
  ) {}

  @Query(() => Category)
  async getCategoryByName(@Arg("name") name: string) {
    return this.categoryService.getCategoryByName(name);
  }

  @Query(() => Category)
  async getCategoryByID(@Arg("id") id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Query(() => [Category])
  async listAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CreateCategoryInput) {
    const category = await this.categoryService.createCategory(data);

    return category;
  }
}
