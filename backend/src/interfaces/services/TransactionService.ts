import { TransactionPaginationOptions } from '@interfaces/queries/TransactionPaginationOptions';
import { Transaction } from '@models/Transaction';
import { Paginated } from '@interfaces/queries/Paginated';

export interface TransactionService {
  findAll(
    options: TransactionPaginationOptions
  ): Promise<Paginated<Transaction>>;
}
