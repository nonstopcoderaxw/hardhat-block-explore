import { HardhatNodeServices } from "../src/HardHatNodeServices";
import { File } from "./utils/utils";
import { TestData } from "./TestData";
import { prisma } from "./prismaDEV";
import * as dotenv from 'dotenv';
dotenv.config();


async function main(): Promise<void> {
	const testData = new TestData(process.env.NODE_ENDPOINT, prisma);
	await TestData.generateMockSigners();
	await TestData.generateMockEnhancedBlock();

	console.log("mock data created!");
}

main();


