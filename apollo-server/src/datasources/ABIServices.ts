import { RESTDataSource } from "@apollo/datasource-rest";
import { Address } from "./Address";
import * as dotenv from 'dotenv';
dotenv.config();

export type Log = {
	address: string,
	data: string, 
	topics: string[]
}

export class ABIServices extends RESTDataSource {

	constructor() {
		super();
		this.baseURL = `${process.env.ABI_SERVICE_ENDPOINT}`;
	}

	findABI(address: string, cache: string) {
		return this.get(`findABI/${address}/${cache}`);
	}

	importABIs(addresses: string[], names: string[], abis: string[] ) {
		return this.post(`importABIs`, {
			body: {
				addresses: addresses, 
				names: names, 
				abis: abis
			}
		})
	}

	decodeLogs(fromList: string[], logs: Log) {
		return this.post(`decodeLogs`, {
			body: {
				fromList: fromList, 
				logs: logs
			}
		})
	}
}
