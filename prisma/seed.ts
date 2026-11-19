import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.deleteMany(); // idempotent: clean before seeding
  await prisma.user.create({
    data: { name: 'Irfan', email: 'irfan@example.com', age: 25, nationality: 'Indian' },
  });
  await prisma.user.create({
    data: { name: 'Asha', email: 'asha@example.com', age: 30, isMarried: true, nationality: 'Indian' },
  });

  const users = await prisma.user.findMany();
  console.log('Users in dev.db (via Prisma):');
  console.log(JSON.stringify(users, null, 2));
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
