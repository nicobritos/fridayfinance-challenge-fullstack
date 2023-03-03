import 'reflect-metadata';
import { ID, Nullable } from '@models/utils/UtilityTypes';
import { injectable } from 'inversify';
import lazyInject from '../ioc/LazyInject';
import TYPES from '../ioc/Types';
import { Category } from '@models/Category';
import { CategoryService } from '@interfaces/services/CategoryService';
import { CategoryRepository } from '@interfaces/repositories/CategoryRepository';

@injectable()
export class CategoryServiceImpl implements CategoryService {
  @lazyInject(TYPES.Repositories.CategoryRepository)
  private declare repository: CategoryRepository;

  findAll(): Promise<Category[]> {
    return this.repository.findAll();
  }

  find(id: ID): Promise<Nullable<Category>> {
    return this.repository.find(id);
  }
}
