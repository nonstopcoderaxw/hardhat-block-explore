import { JsonRpcProvider, JsonRpcSigner } from "ethers";
import { Address } from "./hardhat-types";

export class Data {
	constructor() {}

	static getAccounts(signers: JsonRpcSigner[]): Address[] {
		const _accounts: Address[] = [];
		for (var i = 0; i < signers.length; i++) {
			_accounts.push(new Address(signers[i].address));
		}

		return _accounts;
	}
}