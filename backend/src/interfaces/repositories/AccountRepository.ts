import { Account } from '@models/Account';
import { ID, Nullable } from '@models/utils/UtilityTypes';

export interface AccountRepository {
  findAll(params?: Nullable<{ ids: ID[] }>): Promise<Account[]>;
}
