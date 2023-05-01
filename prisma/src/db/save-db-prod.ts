import { prisma } from "./prisma";
import { File } from "./utils";

async function main() {
	const accounts = await prisma.account.findMany({});
	const blocks = await prisma.block.findMany({});
	const transactions = await prisma.transaction.findMany({});
	const transactionReceipts = await prisma.transactionReceipt.findMany({});
	const logs = await prisma.log.findMany({});

	const bigIntParserFunc = (key: any, value: any) => (typeof value === 'bigint' ? value.toString() : value);
	File.write("./src/db/data/accounts.json", JSON.stringify(accounts, bigIntParserFunc, 4));
	File.write("./src/db/data/blocks.json", JSON.stringify(blocks, bigIntParserFunc, 4));
	File.write("./src/db/data/transactions.json", JSON.stringify(transactions, bigIntParserFunc, 4));
	File.write("./src/db/data/transactionReceipts.json", JSON.stringify(transactionReceipts, bigIntParserFunc, 4));
	File.write("./src/db/data/logs.json", JSON.stringify(logs, bigIntParserFunc, 4));
}	

main();