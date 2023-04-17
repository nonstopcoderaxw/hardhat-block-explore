import { prisma } from "../prismaClient";
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
	await prisma.account.deleteMany({});
	await prisma.block.deleteMany({});
  	await prisma.transactionReceipt.deleteMany({});
  	await prisma.transaction.deleteMany({});
 	await prisma.log.deleteMany({});

 	console.log("PROD: db data cleared!");
}

main();