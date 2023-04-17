import { File } from "./utils/utils";
import { PrismaClientServices } from "../src/PrismaClientServices";
import { ImportJob } from "../src/Jobs";
import { Address } from "./Address";
import { PrismaClient, Account } from '@prisma/client';
import { prismaDEV } from "./prismaClientDEV";
import { TestData } from "./TestData";


// This require database connection!
describe("prisma-client-services.test.ts", () => {
	let services: PrismaClientServices;
	let importJob: ImportJob;
	let addresses: Address[];
	let testData: TestData;


	beforeAll(async () => {
		const prisma = prismaDEV;
		testData = new TestData(process.env.NODE_ENDPOINT, prisma);

		services = new PrismaClientServices(prisma);
		importJob = new ImportJob();
		let signers = File.readAsJson("./test/data/signers.json");
	    addresses = importJob.getAddresses(signers);

	    // delete test data if any
	    await testData.cleardb();
	});
 	
	test('#create.accounts', async () => {
		const signers = File.readAsJson("./test/data/signers.json");
	    const addresses: Address[] = importJob.getAddresses(signers).slice(0, 2);
		await services.create.accounts(addresses, [ "10000000000000000000000", "10000000000000000000000" ], [ true, false ]);
	});

	afterAll(async () => {
		// clear test records
	    await testData.cleardb();
	})
})


