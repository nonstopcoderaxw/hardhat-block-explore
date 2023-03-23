import fs from "fs";

export class File {
	static write(name: string, content: string): void {
		try {
			fs.writeFileSync(name, content);
		} catch (e: any) {
			throw (e);
		}
	}

	static read(name: string): string {
		try {
			return fs.readFileSync(name);
		} catch (e: any) {
			throw (e);
		}
	}

	static readAsJson(name: string): object {
		return JSON.parse(this.read(name));
	}
}