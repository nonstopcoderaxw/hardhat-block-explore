import { JsonRpcProvider, JsonRpcSigner } from "ethers";
import { Address } from "./hardhat-types";

export class HardhatNode {
	public readonly rpc_endpoint: string;
	public readonly provider: JsonRpcProvider;
	public signers: JsonRpcSigner[] = [];

	constructor(rpc_endpoint: string) {
		this.rpc_endpoint = rpc_endpoint;
		this.provider = new JsonRpcProvider(this.rpc_endpoint);
	}

	async init(): Promise<void> {
		this.signers = await this.getSigners();
	}

	async getSigners(): Promise<JsonRpcSigner[]> {
		try {
			return await this.provider.listAccounts();
		} catch (e: any) { 
			throw e;
		}

		return [];
	}
}
