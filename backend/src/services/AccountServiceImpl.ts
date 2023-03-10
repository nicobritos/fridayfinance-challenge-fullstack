import 'reflect-metadata';
import { AccountService } from '@interfaces/services/AccountService';
import { ID, Nullable } from '@models/utils/UtilityTypes';
import { Account } from '@models/Account';
import { AccountRepository } from '@interfaces/repositories/AccountRepository';
import { injectable } from 'inversify';
import lazyInject from '../ioc/LazyInject';
import TYPES from '../ioc/Types';

@injectable()
export class AccountServiceImpl implements AccountService {
  @lazyInject(TYPES.Repositories.AccountRepository)
  private declare repository: AccountRepository;

  async findAll(): Promise<Account[]> {
    return this.repository.findAll();
  }

  async find(id: ID): Promise<Nullable<Account>> {
    return this.repository.find(id);
  }
}
