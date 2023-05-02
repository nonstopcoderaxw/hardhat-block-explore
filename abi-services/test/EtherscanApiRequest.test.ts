import { EtherscanApiRequest } from "../src/EtherscanApiRequest";
import { Address } from "../src/Address";

import * as dotenv from 'dotenv';
dotenv.config();


// this will send live http callouts
describe("EtherscanApiRequest.test.ts", () => {
	let etherscanApiRequest: EtherscanApiRequest;

	beforeAll(async () => {
		etherscanApiRequest = new EtherscanApiRequest(process.env.ETHERSCAN_API_KEY);
	})

	test('#findABI:success', async () => {
		const address: string = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
		await expect(etherscanApiRequest.findABI(new Address(address))).resolves.not.toThrow();
	})

	test('#findABI:error', async () => {
		const address: string = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";
		await expect(etherscanApiRequest.findABI(new Address(address))).rejects.toThrow("ETHERSCAN_ABI_NOT_FOUND");
	})
})