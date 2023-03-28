import { HardhatNode } from "../src/hardhat-node-services";
import { File } from "./utils/utils";



// require the hardhat node running
describe.skip("hardhat-node-servivces.test.ts", () => {
	let hh: HardhatNode;

	beforeAll(async () => {
  		hh = new HardhatNode("http://localhost:8545");
  		await hh.init(); 
	});

	test('HardhatNode#getSigners', async () => {
		expect(hh.signers).toBeDefined();
		expect(hh.signers.length).toBeGreaterThan(0);
	})

	// afterAll(async () => {
	// 	File.write("test/data/signers.json", JSON.stringify(hh.signers, null, 4));
	// })
})
