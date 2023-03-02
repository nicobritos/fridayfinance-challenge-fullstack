import 'reflect-metadata';
import {Account} from '@models/Account';
import { Resolvers } from './generated'
import TYPES from '../../ioc/Types'
import { AccountService } from '@interfaces/services/AccountService'
import { BaseResolver } from '@controllers/resolvers/BaseResolver'
import { injectable } from 'inversify';
import lazyInject from '../../ioc/LazyInject'

@injectable()
class AccountResolverImpl implements BaseResolver {
  @lazyInject(TYPES.Services.AccountService)
  private declare service: AccountService;

  resolvers(): Resolvers {
    return {
      Query: {
        listAccounts: this.listAccounts.bind(this),
      }
    }
  }

  async listAccounts(): Promise<Account[]> {
    return this.service.findAll();
  }
}

const accountResolverImpl: Resolvers = new AccountResolverImpl().resolvers();
export default accountResolverImpl;
