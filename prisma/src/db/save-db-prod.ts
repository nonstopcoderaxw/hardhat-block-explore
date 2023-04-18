import { prisma } from "./prisma";
import { File } from "./utils";

async function main() {
	const accounts = await prisma.account.findMany({});
	const blocks = await prisma.block.findMany({});
	const transactions = await prisma.transaction.findMany({});
	const transactionReceipts = await prisma.transactionReceipt.findMany({});
	const logs = await prisma.log.findMany({});

	File.write("./src/db/data/accounts.json", JSON.stringify(accounts, null, 4));
	File.write("./src/db/data/blocks.json", JSON.stringify(blocks, null, 4));
	File.write("./src/db/data/transactions.json", JSON.stringify(transactions, null, 4));
	File.write("./src/db/data/transactionReceipts.json", JSON.stringify(transactionReceipts, null, 4));
	File.write("./src/db/data/logs.json", JSON.stringify(logs, null, 4));
}	

main();