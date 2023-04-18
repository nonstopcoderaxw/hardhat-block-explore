import { File } from "./utils/utils";
import { prismaDEV as prisma } from "./prismaDEV";

// create mock data into db dev
export async function createMockData(): Promise<void> {
	await cleardb(false);

	const accounts = JSON.parse(File.read("./test/data/accounts.json"));
	const blocks = JSON.parse(File.read("./test/data/blocks.json"));
	const transactions = JSON.parse(File.read("./test/data/transactions.json"));
	const transactionReceipts = JSON.parse(File.read("./test/data/transactionReceipts.json"));
	const logs = JSON.parse(File.read("./test/data/logs.json"));

	await prisma.account.createMany({
		data: accounts
	});

	await prisma.block.createMany({
		data: blocks
	});

	await prisma.transactionReceipt.createMany({
		data: transactionReceipts
	});

	await prisma.transaction.createMany({
		data: transactions
	});

	await prisma.log.createMany({
		data: logs
	});

	console.log("DEV: mock data generated!");
}

// clear all db data and create mock data
export async function cleardb(_showlog: boolean): Promise<void> {
	await prisma.account.deleteMany({});
	await prisma.block.deleteMany({});
	await prisma.transactionReceipt.deleteMany({});
	await prisma.transaction.deleteMany({});
	await prisma.log.deleteMany({});

	if (_showlog) console.log("DEV: db data cleared!");
}