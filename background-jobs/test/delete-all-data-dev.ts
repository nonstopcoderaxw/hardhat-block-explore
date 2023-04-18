import { TestData } from "./TestData";
import { prisma} from "./prismaDEV";
import * as dotenv from 'dotenv';
dotenv.config();

const testData = new TestData(process.env.NODE_ENDPOINT, prisma);
testData.cleardb();