import { RESTDataSource } from "@apollo/datasource-rest";
import { Address } from "./Address";

export class ABIServices extends RESTDataSource {

	constructor() {
		super();
		this.baseURL = "http://localhost:3010";
	}

	findABI(address: string, cache: string) {
		return this.get(`findABI/${address}/${cache}`);
	}

	importABIs(addresses: string[], names: string[], abis: string[] ) {
		const _addresses: Address[] = [];
		addresses.map((item) => {
			_addresses.push(new Address(item));
		})

		return this.post(`importABIs`, {
			body: {
				addresses: _addresses, 
				names: names, 
				abis: abis
			}
		})
	}
}
