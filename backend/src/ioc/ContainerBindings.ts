import 'reflect-metadata';
import { Container } from 'inversify';
import { AccountService } from '@interfaces/services/AccountService';
import TYPES from './Types';
import { AccountServiceImpl } from '@services/AccountServiceImpl';
import { PrismaClient } from '@prisma/client';
import { AccountRepository } from '@interfaces/repositories/AccountRepository';
import { AccountRepositoryImpl } from '@repositories/AccountRepositoryImpl';
import container from './Container';
import { CategoryServiceImpl } from '@services/CategoryServiceImpl';
import { TransactionService } from '@interfaces/services/TransactionService';
import { CategoryService } from '@interfaces/services/CategoryService';
import { CategoryRepositoryImpl } from '@repositories/CategoryRepositoryImpl';
import { CategoryRepository } from '@interfaces/repositories/CategoryRepository';
import { TransactionRepository } from '@interfaces/repositories/TransactionRepository';
import { TransactionRepositoryImpl } from '@repositories/TransactionRepositoryImpl';
import { TransactionServiceImpl } from '@services/TransactionServiceImpl';

export default function bindContainer(): void {
  registerServices(container);
  registerRepositories(container);
  registerExtra(container);
}

function registerServices(container: Container): void {
  container
    .bind<AccountService>(TYPES.Services.AccountService)
    .to(AccountServiceImpl)
    .inSingletonScope();
  container
    .bind<CategoryService>(TYPES.Services.CategoryService)
    .to(CategoryServiceImpl)
    .inSingletonScope();
  container
    .bind<TransactionService>(TYPES.Services.TransactionService)
    .to(TransactionServiceImpl)
    .inSingletonScope();
}

function registerRepositories(container: Container): void {
  container
    .bind<AccountRepository>(TYPES.Repositories.AccountRepository)
    .to(AccountRepositoryImpl)
    .inSingletonScope();
  container
    .bind<CategoryRepository>(TYPES.Repositories.CategoryRepository)
    .to(CategoryRepositoryImpl)
    .inSingletonScope();
  container
    .bind<TransactionRepository>(TYPES.Repositories.TransactionRepository)
    .to(TransactionRepositoryImpl)
    .inSingletonScope();
}

function registerExtra(container: Container): void {
  container
    .bind<PrismaClient>(TYPES.Extra.PrismaClient)
    .toConstantValue(new PrismaClient());
}
