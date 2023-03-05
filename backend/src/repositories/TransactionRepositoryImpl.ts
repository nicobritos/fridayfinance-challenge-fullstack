import 'reflect-metadata';
import { injectable } from 'inversify';
import lazyInject from '../ioc/LazyInject';
import TYPES from '../ioc/Types';
import {
  PrismaClient,
  Transaction as PrismaTransaction,
  Prisma,
} from '@prisma/client';
import { TransactionRepository } from '@interfaces/repositories/TransactionRepository';
import { Transaction } from '@models/Transaction';
import { DateTime } from 'luxon';
import {
  TransactionPaginationFilter,
  TransactionPaginationOptions,
  TransactionPaginationSort,
  TransactionPaginationSortField,
} from '@interfaces/queries/TransactionPaginationOptions';
import { Paginated } from '@models/utils/Paginated';
import { SortOptions } from '@interfaces/queries/SortOptions';
import { ID, Nullable } from '@models/utils/UtilityTypes';

@injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  @lazyInject(TYPES.Extra.PrismaClient)
  private declare prisma: PrismaClient;

  async findAll(
    options: TransactionPaginationOptions
  ): Promise<Paginated<Transaction>> {
    const orderBy = this.buildOrderBy(options.sort);
    const where = this.buildWhere(options.filter);
    let entities = await this.prisma.transaction.findMany({
      skip: options.offset,
      take: options.first + 1,
      orderBy: [orderBy],
      where,
    });

    const hasNext = entities.length === options.first + 1;
    if (hasNext) {
      entities = entities.slice(0, options.first);
    }
    const models = this.toModels(entities);

    return {
      data: models,
      pageInfo: {
        hasNext,
      },
    };
  }

  async find(id: ID): Promise<Nullable<Transaction>> {
    const entity = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (entity) {
      return this.toModel(entity);
    }
    return null;
  }

  buildOrderBy(
    sort: TransactionPaginationSort
  ): Prisma.TransactionOrderByWithRelationInput {
    let field: keyof Prisma.TransactionOrderByWithRelationInput;
    switch (sort.field) {
      case TransactionPaginationSortField.DATE:
        field = 'date';
        break;
      case TransactionPaginationSortField.AMOUNT:
        field = 'amount';
        break;
      case TransactionPaginationSortField.REFERENCE:
        field = 'reference';
        break;
      case TransactionPaginationSortField.CATEGORY:
        // This is a special case, as we want to sort by the category name,
        // not its id
        return {
          category: {
            name: sort.order === SortOptions.ASC ? 'asc' : 'desc',
          },
        };
      default:
        throw new Error('Invalid sort field');
    }

    return {
      [field]: sort.order === SortOptions.ASC ? 'asc' : 'desc',
    };
  }

  buildWhere(
    filter?: TransactionPaginationFilter
  ): Prisma.TransactionWhereInput {
    const where: Prisma.TransactionWhereInput = {};
    if (!filter) {
      return where;
    }

    if (filter.account) {
      where.accountId = filter.account;
    }
    if (filter.bank) {
      where.account = {
        bank: filter.bank,
      };
    }
    if (filter.search) {
      where.reference = {
        contains: filter.search,
        mode: 'insensitive',
      };
    }
    if (filter.date?.from || filter.date?.to) {
      where.date = {};
      if (filter.date?.from) {
        where.date.gte = DateTime.fromISO(filter.date.from).toJSDate();
      }
      if (filter.date?.to) {
        where.date.lte = DateTime.fromISO(filter.date.to).toJSDate();
      }
    }

    return where;
  }

  toModels(prismaTransactions: PrismaTransaction[]): Transaction[] {
    return prismaTransactions.map(this.toModel);
  }

  toModel(prismaTransaction: PrismaTransaction): Transaction {
    return {
      id: prismaTransaction.id,
      accountId: prismaTransaction.accountId,
      categoryId: prismaTransaction.categoryId,
      currency: prismaTransaction.currency,
      reference: prismaTransaction.reference,
      amount: prismaTransaction.amount.toNumber(),
      date: DateTime.fromJSDate(prismaTransaction.date),
    };
  }
}
