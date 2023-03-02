import { Account } from '@models/Account';
import { ID, Nullable } from '@models/utils/UtilityTypes';

export interface AccountService {
  findAll(params?: Nullable<{ ids: ID[] }>): Promise<Account[]>;
}
