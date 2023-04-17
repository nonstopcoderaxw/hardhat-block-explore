import { PrismaClient } from '@prisma/client';

export const primsa = new PrismaClient({
	datasources: {
    	db: {
      		url: process.env.DATABASE_URL_PROD
    	},
  	},
});

