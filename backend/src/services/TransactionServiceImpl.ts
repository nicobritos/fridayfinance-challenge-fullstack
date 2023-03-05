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

@injectable()
export class TransactionServiceImpl implements TransactionService {
  @lazyInject(TYPES.Repositories.TransactionRepository)
  private declare repository: TransactionRepository;

  async findAll(
    options: TransactionPaginationOptions
  ): Promise<Paginated<Transaction>> {
    return this.repository.findAll(options);
  }

  find(id: ID): Promise<Nullable<Transaction>> {
    return this.repository.find(id);
  }
}
