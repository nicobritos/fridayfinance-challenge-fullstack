import 'reflect-metadata';
import TYPES from '../../ioc/Types';
import { BaseResolver } from '@controllers/resolvers/BaseResolver';
import { injectable } from 'inversify';
import lazyInject from '../../ioc/LazyInject';
import { TransactionService } from '@interfaces/services/TransactionService';
import { QueryListTransactionsArgs, Resolvers } from './generated/generated';
import {
  TransactionPaginationFilter,
  TransactionPaginationSortField,
} from '@interfaces/queries/TransactionPaginationOptions';
import { DateRangeOptions } from '@interfaces/queries/FilterOptions';
import { SortOptions } from '@interfaces/queries/SortOptions';
import { Paginated } from '@interfaces/queries/Paginated';
import { Transaction } from '@models/Transaction';
import { AccountService } from '@interfaces/services/AccountService';
import { Account } from '@models/Account';
import { Nullable } from '@models/utils/UtilityTypes';
import { Category } from '@models/Category';
import { CategoryService } from '@interfaces/services/CategoryService';

@injectable()
class TransactionResolverImpl implements BaseResolver {
  @lazyInject(TYPES.Services.TransactionService)
  private declare readonly service: TransactionService;
  @lazyInject(TYPES.Services.AccountService)
  private declare readonly accountService: AccountService;
  @lazyInject(TYPES.Services.CategoryService)
  private declare readonly categoryService: CategoryService;

  resolvers(): Resolvers {
    return {
      Query: {
        listTransactions: this.listTransactions.bind(this),
      },
      Transaction: {
        account: this.getAccount.bind(this),
        category: this.getCategory.bind(this),
      },
    };
  }

  async listTransactions(
    _: any,
    args: QueryListTransactionsArgs
  ): Promise<Paginated<Transaction>> {
    let dateFilter: DateRangeOptions | undefined;
    if (args.pagination.filter?.date) {
      dateFilter = {
        from: args.pagination.filter?.date?.from,
        to: args.pagination.filter?.date?.to,
      };
    }

    let filter: TransactionPaginationFilter | undefined;
    if (args.pagination.filter) {
      filter = {
        date: dateFilter,
        // Remove nulls
        account: args.pagination.filter?.account ?? undefined,
        category: args.pagination.filter?.category,
        search: args.pagination.filter?.search ?? undefined,
      };
    }

    // This returns an Object with the same structure as the TransactionPage type
    return await this.service.findAll({
      first: args.pagination.first,
      offset: args.pagination.offset ?? undefined,
      filter,
      sort: {
        field: TransactionPaginationSortField[args.pagination.sort?.field],
        order: SortOptions[args.pagination.sort?.order],
      },
    });
  }

  async getAccount(transaction: Transaction): Promise<Nullable<Account>> {
    return await this.accountService.find(transaction.accountId);
  }

  async getCategory(transaction: Transaction): Promise<Nullable<Category>> {
    if (transaction.categoryId) {
      return await this.categoryService.find(transaction.categoryId);
    } else {
      return null;
    }
  }
}

const transactionResolverImpl: Resolvers =
  new TransactionResolverImpl().resolvers();
export default transactionResolverImpl;
