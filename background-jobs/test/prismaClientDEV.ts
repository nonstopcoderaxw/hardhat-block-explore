import { PrismaClient } from '@prisma/client';

export const prismaDEV = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_DEV,
    },
  },
})