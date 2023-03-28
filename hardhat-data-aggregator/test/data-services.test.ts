import { DataServices } from "../src/data-services"
import { Address } from "../src/hardhat-types";
import { File } from "./utils/utils";

describe.only("data-services.test.ts", () => {
	let services: DataServices;

	beforeAll(() => {
		services = new DataServices();
	})

	test('getAddresses', async () => {
		const signers = File.readAsJson("./test/data/signers.json");
	    const addresses = services.getAddresses(signers);

	    expect(addresses).toBeDefined();
	    expect(addresses.length).toBeGreaterThan(0);
	})
})
