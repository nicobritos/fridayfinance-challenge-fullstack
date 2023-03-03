import { Account } from '@models/Account';
import { ID, Nullable } from '@models/utils/UtilityTypes';

export interface AccountService {
  findAll(): Promise<Account[]>;

  find(id: ID): Promise<Nullable<Account>>;
}
