import axios from "axios";
import { ABIServices } from "../src/ABIServices";
import { Address } from "../src/Address";



// this test requires express server running!
describe("index.test.ts", () => {
	const abi = `[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"ContractCreated","type":"event"},{"inputs":[{"internalType":"address payable","name":"to","type":"address"}],"name":"send","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"var1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`;

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
					"0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", 
					"0x6B175474E89094C44Da98b954EedeAC495271d0F", 
				], 
				names: [
					"test1", "test2"
				], 
				abis: [
					abi, abi
				]
			}, {
    			headers: { 'Content-Type': 'application/json' }
    		})
		).resolves.not.toThrow();
	})

	test("./decodeLogs", async () => {
		const fromList = [ "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f" ];

		await ABIServices.importABIs(
			[ new Address("0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f") ], [ "test" ], [ abi ]
		);

		await expect(
			axios.post("http://localhost:3010/decodeLogs", {
				fromList: fromList, 
				logs: [
					{
						"address": "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f",
			        	"data": "0x00000000000000000000000073511669fd4de447fed18bb79bafeac93ab7f31f",
			        	"topics": [
			            	"0xcf78cf0d6f3d8371e1075c69c492ab4ec5d8cf23a1a239b6a51a1d00be7ca312"
			        	]
			        }
				]
			}, {
    			headers: { 'Content-Type': 'application/json' }
    		})
		).resolves.not.toThrow();
	})
})