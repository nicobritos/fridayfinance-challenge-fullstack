import { Transaction } from '@models/Transaction';
import { TransactionPaginationOptions } from '@interfaces/queries/TransactionPaginationOptions';
import { Paginated } from '@models/utils/Paginated';
import { ID, Nullable } from '@models/utils/UtilityTypes';

export interface TransactionRepository {
  findAll(
    options: TransactionPaginationOptions
  ): Promise<Paginated<Transaction>>;

  find(id: ID): Promise<Nullable<Transaction>>;
}
