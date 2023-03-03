import 'reflect-metadata';
import { injectable } from 'inversify';
import lazyInject from '../ioc/LazyInject';
import TYPES from '../ioc/Types';
import { PrismaClient, Transaction as PrismaTransaction } from '@prisma/client';
import { TransactionRepository } from '@interfaces/repositories/TransactionRepository';
import { Transaction } from '@models/Transaction';
import { DateTime } from 'luxon';
import { TransactionPaginationOptions } from '@interfaces/queries/TransactionPaginationOptions';
import { Paginated } from '@interfaces/queries/Paginated';

@injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  @lazyInject(TYPES.Extra.PrismaClient)
  private declare prisma: PrismaClient;

  async findAll(
    options: TransactionPaginationOptions
  ): Promise<Paginated<Transaction>> {
    let entities = await this.prisma.transaction.findMany({
      skip: options.offset,
      take: options.first + 1,
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
