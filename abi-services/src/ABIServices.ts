import { EtherscanApiRequest } from "./EtherscanApiRequest";
import { Redis } from "ioredis";
import { Address } from "./Address";
import ABIDecoder from "abi-decoder-typescript"
import erc20 from "./abis/ERC20.json";
import erc721 from "./abis/ERC721.json";

// preload abis - ERC20, ERC721
const abiDecoder = new ABIDecoder();
abiDecoder.addABI(erc20);
abiDecoder.addABI(erc721);

export type ABIResponse = {
	name?: string,
	abi: Object,
	cache: boolean
}

export type Log = {
	address: string,
	data: string, 
	topics: string[]
}

export type DecodedLog = {
	name: string,
	events: EventData[],
	address: string
}

export type EventData = {
	name: string, 
	type: string,
	value: string
}

const redis = new Redis({
	host: process.env.REDISHOST!,
    port: Number(process.env.REDISPORT!),
    username: process.env.REDISUSER!,
    password: process.env.REDISPASSWORD!,
});

export class ABIServices {
	private readonly etherscanApiRequest: EtherscanApiRequest;

	constructor(etherscanApiRequest: EtherscanApiRequest) {
		this.etherscanApiRequest = etherscanApiRequest;
	}

	async findABI(address: Address, options: { cache: boolean } = { cache: true }): Promise<ABIResponse | null> {
		// if cache = true, find it from redis, if redis says no, then find from etherscan, then save it into redis
		try {
			var abi: Object | undefined;

			// find from cache
			if (options.cache) {
				// find from internal
				abi = JSON.parse((await redis.hget("abi:internal:abis", address.value)) as string);
				const name = (await redis.hget("abi:internal:names", address.value)) as string;

				if (abi) {
					return { name: name, abi: abi, cache: true };
				}
				
				abi = JSON.parse((await redis.hget("abi:external", address.value)) as string);
				if (abi) {
					return { abi: abi, cache: true };
				}
			}

			// if cache = false, find it from etherscan, then save it into resdis
			if (!abi) {
				abi = await this.etherscanApiRequest.findABI(address);
				if (abi) {
					// cache
					await redis.hmset("abi:external", address.value, JSON.stringify(abi));
					return { abi: abi, cache: false };
				}
			}
			
			return null;
		} catch (e: any) {
			throw (e);
		}
	}

	// function: decode log
	// return: null when no abi found for decoding
	// return: array for decoded logs
	async decodeLogs(fromAddresses: Address[], logs: Log[]): Promise<DecodedLog[] | null> {
		try {
			for(let i = 0; i < fromAddresses.length; i++) {
				let abiRes: ABIResponse | null;
				try {
					abiRes = await this.findABI(fromAddresses[i]);
				} catch {
					abiRes = null;
				}
				if (!abiRes) continue;
				abiDecoder.addABI(JSON.parse(JSON.stringify(abiRes.abi)));
			}

			return abiDecoder.decodeLogs(logs);
		} catch (e) {
			throw (e);
		}
	}

	// function: import ABI from HH
	static async importABIs(addresses: Address[], names: string[], abis: string[]): Promise<void> {
		try {
			for (let i = 0; i < addresses.length; i++) {
				const item = addresses[i];
				await redis.hmset("abi:internal:names", item.value, names[i]);
				await redis.hmset("abi:internal:abis", item.value, abis[i]);
			}
						
		} catch (e: any) {
			throw (new Error(e));
		}
	}

	static async clearCache(): Promise<void> {
		try {
			await this.clearRedisKeys(redis, "abi:external");
			await this.clearRedisKeys(redis, "abi:internal");
			
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