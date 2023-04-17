import { prisma } from "../datasources/prisma";
import { File } from "./utils/utils";

async function main() {
	const accounts = await prisma.account.findMany({});
	const blocks = await prisma.block.findMany({});
	const transactions = await prisma.transaction.findMany({});
	const transactionReceipts = await prisma.transactionReceipt.findMany({});
	const logs = await prisma.log.findMany({});

}	

main();