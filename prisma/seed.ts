/*
import bcrypt from 'bcryptjs'
import FakePrismaDB from "@/lib/fake-prisma-db";
//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();
const prisma = new FakePrismaDB();
const users = prisma.createModel('User ').model<{
  name: string,
  email: string,
  password: string,
}>('User');


async function main() {
  // Only include fields that match your schema
  const user = await users.upsert({
    where: { email: 'admin@prisma.io' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@prisma.io',
      password: bcrypt.hashSync('admin', 12),
    },
  })
  console.log({ user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  */