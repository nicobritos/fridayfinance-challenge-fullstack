import 'reflect-metadata';
import { Container } from 'inversify';
import { AccountService } from '@interfaces/services/AccountService';
import TYPES from './Types';
import { AccountServiceImpl } from '@services/AccountServiceImpl';
import { PrismaClient } from '@prisma/client';
import { AccountRepository } from '@interfaces/repositories/AccountRepository';
import { AccountRepositoryImpl } from '@repositories/AccountRepositoryImpl';
import container from './Container';

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
}

function registerRepositories(container: Container): void {
  container
    .bind<AccountRepository>(TYPES.Repositories.AccountRepository)
    .to(AccountRepositoryImpl)
    .inSingletonScope();
}

function registerExtra(container: Container): void {
  container
    .bind<PrismaClient>(TYPES.Extra.PrismaClient)
    .toConstantValue(new PrismaClient());
}
