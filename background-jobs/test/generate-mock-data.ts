import { HardhatNodeServices } from "../src/HardHatNodeServices";
import { File } from "./utils/utils";
import { generateMockSigners, generateMockEnhancedBlock } from "./test-data-funcs";


async function main(): Promise<void> {
	await generateMockSigners();
	await generateMockEnhancedBlock();

	console.log("mock data created!");
}

main();


