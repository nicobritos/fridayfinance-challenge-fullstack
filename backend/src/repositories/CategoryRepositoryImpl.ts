import 'reflect-metadata';
import { ID, Nullable } from '@models/utils/UtilityTypes';
import { injectable } from 'inversify';
import lazyInject from '../ioc/LazyInject';
import TYPES from '../ioc/Types';
import { PrismaClient, Category as PrismaCategory } from '@prisma/client';
import { CategoryRepository } from '@interfaces/repositories/CategoryRepository';
import { Category } from '@models/Category';

@injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  @lazyInject(TYPES.Extra.PrismaClient)
  private declare prisma: PrismaClient;

  async findAll(): Promise<Category[]> {
    return this.toModels(await this.prisma.category.findMany({}));
  }

  async find(id: ID): Promise<Nullable<Category>> {
    const entity = await this.prisma.category.findUnique({ where: { id } });
    if (entity == null) {
      return null;
    }
    return this.toModel(entity);
  }

  toModels(prismaCategories: PrismaCategory[]): Category[] {
    return prismaCategories.map(this.toModel);
  }

  toModel(prismaCategory: PrismaCategory): Category {
    return {
      id: prismaCategory.id,
      name: prismaCategory.name,
      color: prismaCategory.color,
    };
  }
}
