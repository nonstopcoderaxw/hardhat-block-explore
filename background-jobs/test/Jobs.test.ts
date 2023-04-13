import { ImportJob } from "../src/Jobs"
import { Address } from "../src/Address";
import { File } from "./utils/utils";
import { PrismaClientServices } from "../src/PrismaClientServices";
import { cleardb } from "./test-data-funcs";
import { HardhatNodeServices, EnhancedBlock } from "../src/HardhatNodeServices";
import { PrismaClient, Account } from '@prisma/client';
import { TransactionReceipt, TransactionResponse, Block } from "ethers";

jest.mock("../src/HardhatNodeServices");

HardhatNodeServices.mockImplementation(() => {
	return {
		signers: File.readAsJson("./test/data/signers.json").slice(0, 2),
		getBalances: jest.fn().mockImplementation(() => {
			return [ "90000000000000000000000", "10000000000000000000000" ];
		}),
		getEnhancedBlock: jest.fn().mockImplementation(() => {
			return File.readAsJson("./test/data/enhancedBlock.json");
		})
	}
})

describe("Jobs.test.ts", () => {
	let prismaClientServices: PrismaClientServices;
	let hardhatNodeServices: HardhatNodeServices;
	let importJob: ImportJob;

	beforeAll(async () => {
		prismaClientServices = new PrismaClientServices(new PrismaClient());
		importJob = new ImportJob(new HardhatNodeServices(""), prismaClientServices);
	})

	beforeEach(async () => {
		await cleardb(false);		
	})

	test('getAddresses', async () => {
		const signers = File.readAsJson("./test/data/signers.json");
	    const addresses = importJob.getAddresses(signers);

	    expect(addresses).toBeDefined();
	    expect(addresses.length).toBeGreaterThan(0);
	})

	test("upsertAccounts", async() => {
		const signers = File.readAsJson("./test/data/signers.json");
	    var addresses: Address[] = importJob.getAddresses(signers.slice(0, 2));	    
	    var balances: bigint[] = [ "10000000000000000000000", "10000000000000000000000" ];
	    
	  	// no existing records
	    await expect(importJob.upsertAccounts(addresses, balances, [false, false])).resolves.not.toThrow();
	   	await expect(importJob.prismaClientServices.prisma.account.findMany({})).resolves.toHaveLength(2);

	   	// with existing records - 
	   	addresses = importJob.getAddresses(signers.slice(1, 3));	    
	    balances = [ "900000000000000000000000", "900000000000000000000000" ];
	    await expect(importJob.upsertAccounts(addresses, balances, [false, false])).resolves.not.toThrow();
	    await expect(importJob.prismaClientServices.prisma.account.findMany({})).resolves.toHaveLength(3);

	    const balActual = await importJob.prismaClientServices.prisma.account.findMany({});
	    expect(balActual[2].balance).toEqual(balances[1]);
	})

	test("importJobExec", async() => {
		await importJob.importJobExec(0);
		await expect(importJob.prismaClientServices.prisma.account.findMany({})).resolves.toHaveLength(2);
	})

	test("createContracts", async() => {
		await importJob.importJobExec(0);
		await expect(importJob.createContracts(32)).resolves.not.toThrow();
		await expect(importJob.prismaClientServices.prisma.account.findMany({
			where: {
				isContract: true
			}
		})).resolves.toHaveLength(1);

	})

})