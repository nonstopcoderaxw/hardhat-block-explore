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


})