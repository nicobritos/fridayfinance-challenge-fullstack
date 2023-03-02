import 'reflect-metadata';
import TYPES from '../../ioc/Types';
import { BaseResolver } from '@controllers/resolvers/BaseResolver';
import { injectable } from 'inversify';
import lazyInject from '../../ioc/LazyInject';
import { Category } from '@models/Category';
import { Resolvers } from './generated';
import { CategoryService } from '@interfaces/services/CategoryService';

@injectable()
class CategoryResolverImpl implements BaseResolver {
  @lazyInject(TYPES.Services.CategoryService)
  private declare readonly service: CategoryService;

  resolvers(): Resolvers {
    return {
      Query: {
        listCategories: this.listCategories.bind(this),
      },
    };
  }

  async listCategories(): Promise<Category[]> {
    return this.service.findAll();
  }
}

const categoryResolverImpl: Resolvers = new CategoryResolverImpl().resolvers();
export default categoryResolverImpl;
