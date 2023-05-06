import { utils } from "ethers";

export class Address {
	public readonly value; // this is checksum address
	
	constructor(address: string) {
		this.value = utils.getAddress(address);
	}

	public equal(b: Address): boolean {
		if ( this.value === b.value ) {
			return true;
		} 

		return false;
	}
}


