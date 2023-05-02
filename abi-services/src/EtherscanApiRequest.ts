import axios from "axios";
import { Address } from "./Address";


export class EtherscanApiRequest {
	private readonly ENDPOINT = "https://api.etherscan.io/api";
	private readonly apiKey;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	async findABI(address: Address): Promise<Object> {
		const url: string = `${this.ENDPOINT}?module=contract&action=getabi&address=${address.value}&apikey=${this.apiKey}`;
		try {
			const result: any = await axios.get(url);

			if (result.data.status == "0") throw (new Error("ETHERSCAN_ABI_NOT_FOUND"));

			return JSON.parse(result.data.result);
		} catch (e: any) {
			throw (e);
		}	
	}
}

