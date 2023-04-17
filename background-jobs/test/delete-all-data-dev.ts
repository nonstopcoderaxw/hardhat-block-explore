import { TestData } from "./TestData";
import { prismaDEV } from "./prismaClientDEV";
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = prismaDEV;
const testData = new TestData(process.env.NODE_ENDPOINT, prisma);
testData.cleardb();