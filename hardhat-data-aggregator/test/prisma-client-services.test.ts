import { File } from "./utils/utils";
import { PrismaClientServices } from "../src/prisma-client-services";
import { DataServices } from "../src/data-services"
import { Account } from '@prisma/client'
import { Address } from "./hardhat-types";

// This require database connection!
describe.skip("prisma-client-services.test.ts", () => {
	let services: PrismaClientServices;
	let dataService: DataServices;
	let addresses: Address[];

	
	beforeAll(async () => {
		services = new PrismaClientServices();
		dataService = new DataServices();
		let signers = File.readAsJson("./test/data/signers.json");
	    addresses = dataService.getAddresses(signers);

	    // delete test data if any
	    await services.delete.accounts(addresses);
	});

	test('#create.accounts', async () => {
		const signers = File.readAsJson("./test/data/signers.json");
	    const addresses: Address[] = dataService.getAddresses(signers);
		await services.create.accounts(addresses);
	});

})


