import axios from "axios";
import { ABIServices } from "../src/ABIServices";
import { Address } from "../src/Address";



// this test requires express server running!
describe("index.test.ts", () => {
	
	test('/findABI', async () => {
		// delete cache
		await ABIServices.clearCache();
		await expect(
			axios.get("http://localhost:3010/findABI/0x6B175474E89094C44Da98b954EedeAC495271d0F/true")
		).resolves.not.toThrow();

		await expect(
			axios.get("http://localhost:3010/findABI/0x6B175474E89094C44Da98b954EedeAC495271d0F/false")
		).resolves.not.toThrow();

		await expect(
			axios.get("http://localhost:3010/findABI/0x6B175474E89094C44Da98b954EedeAC495271d0E/false")
		).rejects.toThrow();

		var result;
		result = await axios.get("http://localhost:3010/findABI/0x6B175474E89094C44Da98b954EedeAC495271d0F/false");
		expect(result.data).toHaveProperty("cache", false);

		result = await axios.get("http://localhost:3010/findABI/0x6B175474E89094C44Da98b954EedeAC495271d0F/true");
		expect(result.data).toHaveProperty("cache", true);
	})

	test("./importABIs", async () => {
		await ABIServices.clearCache();
		await expect(
			axios.post("http://localhost:3010/importABIs", {
				addresses: [
					new Address("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"), 
					new Address("0x6B175474E89094C44Da98b954EedeAC495271d0F"), 
				], 
				names: [
					"test1", "test2"
				], 
				abis: [
					"abi1", "abi2"
				]
			}, {
    			headers: { 'Content-Type': 'application/json' }
    		})
		).resolves.not.toThrow();
	})
})