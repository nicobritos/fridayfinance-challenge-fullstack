import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await seedAccounts();
  await seedCategories();
  await seedTransactions();
}

async function seedAccounts(): Promise<void> {
  const filePath = '/seed/accounts.csv';

  await prisma.$executeRawUnsafe(`
    COPY "Account" (id, name, bank) FROM '${filePath}' WITH (FORMAT csv, HEADER true, DELIMITER ',');
  `);
}

async function seedCategories(): Promise<void> {
  const filePath = '/seed/categories.csv';

  await prisma.$executeRawUnsafe(`
    COPY "Category" (id, name, color) FROM '${filePath}' WITH (FORMAT csv, HEADER true, DELIMITER ',');
  `);
}

async function seedTransactions(): Promise<void> {
  const filePath = '/seed/transactions.csv';

  await prisma.$executeRaw`SET datestyle = ymd;`;
  await prisma.$executeRawUnsafe(`
    COPY "Transaction" ("id","accountId","categoryId","reference","amount","currency","date") FROM '${filePath}' WITH (FORMAT csv, HEADER true, DELIMITER ',');
  `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
