import 'reflect-metadata';
import { ID, Nullable } from '@models/utils/UtilityTypes';
import { Account } from '@models/Account';
import { AccountRepository } from '@interfaces/repositories/AccountRepository';
import { injectable } from 'inversify';
import lazyInject from '../ioc/LazyInject';
import TYPES from '../ioc/Types';
import { PrismaClient, Account as PrismaAccount } from '@prisma/client';

@injectable()
export class AccountRepositoryImpl implements AccountRepository {
  @lazyInject(TYPES.Extra.PrismaClient)
  private declare prisma: PrismaClient;

  async findAll(): Promise<Account[]> {
    return this.toModels(await this.prisma.account.findMany({}));
  }

  async find(id: ID): Promise<Nullable<Account>> {
    const entity = await this.prisma.account.findUnique({ where: { id } });
    if (entity == null) {
      return null;
    }
    return this.toModel(entity);
  }

  toModels(prismaAccounts: PrismaAccount[]): Account[] {
    return prismaAccounts.map(this.toModel);
  }

  toModel(prismaAccount: PrismaAccount): Account {
    return {
      id: prismaAccount.id,
      name: prismaAccount.name,
      bank: prismaAccount.bank,
    };
  }
}
