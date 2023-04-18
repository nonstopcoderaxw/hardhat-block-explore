import { EtherscanApiRequest } from "./EtherscanApiRequest";
import { Redis } from "ioredis";
import { Address } from "./Address";


export type ABIResponse = {
	abi: Object,
	cache: boolean
}

export class ABIServices {
	private readonly etherscanApiRequest: EtherscanApiRequest;

	constructor(etherscanApiRequest: EtherscanApiRequest) {
		this.etherscanApiRequest = etherscanApiRequest;
	}

	async findABI(address: string, options: { cache: boolean } = { cache: true }): Promise<ABIResponse | null> {
		// if cache = true, find it from redis, if redis says no, then find from etherscan, then save it into redis
		try {
			const redis = new Redis();
			var abi: Object | undefined;

			if (options.cache) {
				abi = JSON.parse((await redis.hget("abi:external", address)) as string);
				if (abi) {
					await redis.quit();
					return { abi: abi, cache: true };
				}
			}

			// if cache = false, find it from etherscan, then save it into resdis
			if (!abi) {
				abi = await this.etherscanApiRequest.findABI(address);
				if (abi) {
					// cache
					await redis.hmset("abi:external", address, JSON.stringify(abi));
					await redis.quit();
					return { abi: abi, cache: false };
				}
			}
			
			return null;
		} catch (e: any) {
			throw (e);
		}
	}

	// function: import ABI from HH
	static async importABIs(addresses: Address[], names: string[], abis: string[]): Promise<void> {
		try {
			const redis = new Redis();

			for (let i = 0; i < addresses.length; i++) {
				const item = addresses[i];
				await redis.hmset("abi:internal:names", item.value, names[i]);
				await redis.hmset("abi:internal:abis", item.value, abis[i]);
			}
						
			await redis.quit();
		} catch (e: any) {
			throw (new Error(e));
		}
	}

	static async clearCache(): Promise<void> {
		try {
			const redis = new Redis();
			await this.clearRedisKeys(redis, "abi:external");
			await this.clearRedisKeys(redis, "abi:internal");
			
			await redis.quit();
		} catch (e: any) {
			throw (e);
		}
	}

	static async clearRedisKeys(redis: Redis, key: string): Promise<void> {
		try {
			const keys: string[] = Object.keys(await redis.hgetall(key));
			if (keys.length > 0) await redis.hdel(key, ...keys);
		} catch (e: any) {
			throw (e);
		}
		
	}

}