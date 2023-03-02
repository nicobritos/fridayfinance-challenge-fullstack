import 'reflect-metadata';
import { ID, Nullable } from '@models/utils/UtilityTypes'
import { Account } from '@models/Account'
import { AccountRepository } from '@interfaces/repositories/AccountRepository'
import { injectable } from 'inversify'
import lazyInject from '../ioc/LazyInject'
import TYPES from '../ioc/Types'
import { PrismaClient, Account as PrismaAccount } from '@prisma/client';

@injectable()
export class AccountRepositoryImpl implements AccountRepository {
  @lazyInject(TYPES.Repositories.AccountRepository)
  declare private repository: AccountRepository;
  @lazyInject(TYPES.Extra.PrismaClient)
  declare private prisma: PrismaClient;

  async findAll(params?: Nullable<{ ids?: ID[] }>): Promise<Account[]> {
    if (params?.ids) {
      return this.toModels(await this.prisma.account.findMany({where: {id: {in: params.ids}}}));
    }
    return this.toModels(await this.prisma.account.findMany({}));
  }

  toModels(prismaAccounts: PrismaAccount[]): Account[] {
    return prismaAccounts.map(this.toModel);
  }

  toModel(prismaAccount: PrismaAccount): Account {
    return new Account({
      id: prismaAccount.id,
      name: prismaAccount.name,
      bank: prismaAccount.bank,
    });
  }
}
