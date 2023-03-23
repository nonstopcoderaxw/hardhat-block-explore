import { getAddress } from "ethers";

export class Address {
	public readonly value; // this is checksum address
	
	constructor(address: string) {
		this.value = getAddress(address);
	}
}


