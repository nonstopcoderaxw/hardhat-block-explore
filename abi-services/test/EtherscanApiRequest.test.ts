import { EtherscanApiRequest } from "../src/EtherscanApiRequest";
import * as dotenv from 'dotenv';
dotenv.config();


// this will send live http callouts
describe("EtherscanApiRequest.test.ts", () => {
	let etherscanApiRequest: EtherscanApiRequest;

	beforeAll(async () => {
		etherscanApiRequest = new EtherscanApiRequest(process.env.ETHERSCAN_API_KEY);
	})

	test('#findABI:success', async () => {
		const address: String = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
		await expect(etherscanApiRequest.findABI(address)).resolves.not.toThrow();
	})

	test('#findABI:error', async () => {
		const address: String = "0x6B175474E89094C44Da98b954EedeAC495271d0E";
		await expect(etherscanApiRequest.findABI(address)).rejects.toThrow("ETHERSCAN_ABI_NOT_FOUND");
	})
})