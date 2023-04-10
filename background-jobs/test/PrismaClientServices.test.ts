import { File } from "./utils/utils";
import { PrismaClientServices } from "../src/PrismaClientServices";
import { ImportJob } from "../src/Jobs";
import { Address } from "./Address";
import { PrismaClient, Account } from '@prisma/client';


// This require database connection!
describe.skip("prisma-client-services.test.ts", () => {
	let services: PrismaClientServices;
	let importJob: ImportJob;
	let addresses: Address[];

	beforeAll(async () => {
		services = new PrismaClientServices(new PrismaClient());
		importJob = new ImportJob();
		let signers = File.readAsJson("./test/data/signers.json");
	    addresses = importJob.getAddresses(signers);

	    // delete test data if any
	    await services.delete.accounts(addresses);
	});
 	
	test('#create.accounts', async () => {
		const signers = File.readAsJson("./test/data/signers.json");
	    const addresses: Address[] = importJob.getAddresses(signers).slice(0, 2);
		await services.create.accounts(addresses, [ "10000000000000000000000", "10000000000000000000000" ]);
	});

})


