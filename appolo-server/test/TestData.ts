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
		data: blocks.map((item: any)=>{
			item.number = BigInt(item.number);
			item.timestamp = BigInt(item.timestamp);
			item.nonce = BigInt(item.nonce);
			return item;
		})
	});

	await prisma.transactionReceipt.createMany({
		data: transactionReceipts.map((item: any) => {
			item.blockNumber = BigInt(item.blockNumber)
			item.index = BigInt(item.index)
			return item;
		})
	});

	await prisma.transaction.createMany({
		data: transactions.map((item: any) => {
			item.blockNumber = BigInt(item.blockNumber)
			item.chainId = BigInt(item.chainId)
			item.nonce = BigInt(item.nonce)
			item.type = BigInt(item.type)
			item.v = BigInt(item.v)
			return item;
		})
	});

	await prisma.log.createMany({
		data: logs.map((item: any) => {
			item.index = BigInt(item.index)
			item.blockNumber = BigInt(item.blockNumber)
			return item;
		})
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