import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

export const prismaDEV = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_DEV,
    },
  },
})