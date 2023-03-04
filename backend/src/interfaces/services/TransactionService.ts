import { TransactionPaginationOptions } from '@interfaces/queries/TransactionPaginationOptions';
import { Transaction } from '@models/Transaction';
import { Paginated } from '@models/utils/Paginated';

export interface TransactionService {
  findAll(
    options: TransactionPaginationOptions
  ): Promise<Paginated<Transaction>>;
}
