import { Transaction } from '@models/Transaction';
import { TransactionPaginationOptions } from '@interfaces/queries/TransactionPaginationOptions';
import { Paginated } from '@interfaces/queries/Paginated';

export interface TransactionRepository {
  findAll(
    options: TransactionPaginationOptions
  ): Promise<Paginated<Transaction>>;
}
