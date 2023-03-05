import 'reflect-metadata';
import { injectable } from 'inversify';
import lazyInject from '../ioc/LazyInject';
import TYPES from '../ioc/Types';
import { TransactionRepository } from '@interfaces/repositories/TransactionRepository';
import { Transaction } from '@models/Transaction';
import { TransactionService } from '@interfaces/services/TransactionService';
import { TransactionPaginationOptions } from '@interfaces/queries/TransactionPaginationOptions';
import { Paginated } from '@models/utils/Paginated';
import { ID, Nullable } from '@models/utils/UtilityTypes';
import { CategoryService } from '@interfaces/services/CategoryService';

@injectable()
export class TransactionServiceImpl implements TransactionService {
  @lazyInject(TYPES.Repositories.TransactionRepository)
  private declare repository: TransactionRepository;
  @lazyInject(TYPES.Services.CategoryService)
  private declare categoryService: CategoryService;

  async findAll(
    options: TransactionPaginationOptions
  ): Promise<Paginated<Transaction>> {
    return this.repository.findAll(options);
  }

  find(id: ID): Promise<Nullable<Transaction>> {
    return this.repository.find(id);
  }

  async setCategory(id: ID, categoryId: Nullable<ID>): Promise<Transaction> {
    const transaction = await this.find(id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    if (categoryId !== null) {
      const category = await this.categoryService.find(categoryId!);
      if (!category) {
        throw new Error('Category not found');
      }
    }

    return this.repository.setCategory(id, categoryId);
  }
}
