import { Interface, FormatTypes } from "@ethersproject/abi";

export type Function = {
	minimal: string[],
	json: any[]
}

export class Abi {
	public readonly abi: string;
	public readonly iface: Interface;
	constructor(abi: string) {
		this.abi = JSON.parse(abi);
		this.iface = new Interface(this.abi);
	}

	toMinimal() {
		return this.iface.format(FormatTypes.minimal);
	}

	toJson() {
		return JSON.parse(this.iface.format(FormatTypes.json) as string);
	}

	getFunctions(): Function {
		const abiJson = this.toJson();
		const funcAbiJson = abiJson.filter((item) => {
			return item.type === "function"
		}) 

		return {
			minimal: (new Interface(funcAbiJson)).format(FormatTypes.minimal) as any[],
			json: funcAbiJson
		}
	}
}
