import { TransactionPaginationOptions } from '@interfaces/queries/TransactionPaginationOptions';
import { Transaction } from '@models/Transaction';
import { Paginated } from '@models/utils/Paginated';
import { ID, Nullable } from '@models/utils/UtilityTypes';

export interface TransactionService {
  findAll(
    options: TransactionPaginationOptions
  ): Promise<Paginated<Transaction>>;

  find(id: ID): Promise<Nullable<Transaction>>;
}
