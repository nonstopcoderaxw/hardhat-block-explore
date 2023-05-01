import { Address } from "../src/Address"
import { ABIServices } from "../src/ABIServices";
import { EtherscanApiRequest } from "../src/EtherscanApiRequest";
import { File } from "./utils/utils";
import * as dotenv from 'dotenv';
import { Redis } from "ioredis";

dotenv.config();

jest.mock("../src/EtherscanApiRequest");

EtherscanApiRequest.mockImplementation(() => {
	return {
		findABI: jest.fn().mockImplementation(() => {
			return File.readAsJson("./test/data/mockABI.json");
		})
	}
})

describe("ABIServices.test.ts", () => {
	let abiServices: ABIServices;
	let mock = new EtherscanApiRequest("");

	beforeAll(async () => {
		abiServices = new ABIServices(mock);
	})

	test('#findABI', async () => {
		const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
		//delete in redis
		const redis = new Redis();
		await redis.hdel("abi:external", address);
		await redis.hdel("abi:internal:abis", address);

		await redis.quit();

		await expect(abiServices.findABI(address, { cache: true })).resolves.toHaveProperty("cache", false);
		expect(mock.findABI).toHaveBeenCalledTimes(1);

		await expect(abiServices.findABI(address, { cache: true })).resolves.toHaveProperty("cache", true);
		expect(mock.findABI).toHaveBeenCalledTimes(1);

		await expect(abiServices.findABI(address, { cache: false })).resolves.toHaveProperty("cache", false)
		expect(mock.findABI).toHaveBeenCalledTimes(2);

		await expect(ABIServices.clearCache()).resolves.not.toThrow();
	})

	test('#clearCache', async () => {
		await expect(ABIServices.clearCache()).resolves.not.toThrow();
	})

	test("#decodeLogs", async () => {
		const fromAddresses = [ new Address("0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f") ];
		const logs = File.readAsJson("./test/data/mockLogs.json");
		const abi = `[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"ContractCreated","type":"event"},{"inputs":[{"internalType":"address payable","name":"to","type":"address"}],"name":"send","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"var1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`;
		await ABIServices.importABIs(
			fromAddresses, [ "test" ], [ abi ]
		);

		await expect(abiServices.decodeLogs(fromAddresses, logs)).resolves.toEqual(expect.arrayContaining(
			[
				{"name":"ContractCreated","events":[{"name":"_address","type":"address","value":"0x73511669fd4de447fed18bb79bafeac93ab7f31f"}],"address":"0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"}
			]
		));
	})	


})