"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const Jobs_1 = require("./Jobs");
const HardhatNodeServices_1 = require("./HardhatNodeServices");
const PrismaClientServices_1 = require("./PrismaClientServices");
const log_config_1 = require("./log.config");
const prismaClient_1 = require("./prismaClient");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
main();
async function main() {
    const connection = new ioredis_1.default({
        maxRetriesPerRequest: 0
    });
    var bnToProcess = 0n;
    var noMoreBlockToProcessNotified = false;
    if (process.env.FROM_FIRST_BLOCK == "0") {
        bnToProcess = HardhatNodeServices_1.HardhatNodeServices.getFirstBlockNumber();
    }
    const importQ = new bullmq_1.Queue('importQueue', { connection });
    await importQ.resume();
    // cron: every 2 seconds
    // run:  import hh raw data into db
    await importQ.add('import', {}, {
        removeOnComplete: 100,
        removeOnFail: 100,
        repeat: {
            every: Number(process.env.JOB_SCHEDULE), // every 2 seconds
        },
    });
    const importJob = new Jobs_1.ImportJob(new HardhatNodeServices_1.HardhatNodeServices(process.env.NODE_ENDPOINT), new PrismaClientServices_1.PrismaClientServices(prismaClient_1.prisma));
    var currbn = await importJob.hardhatNodeServices.blockNumber;
    const importW = new bullmq_1.Worker("importQueue", async (job) => {
        try {
            // check currentbn and lastbn
            currbn = await importJob.hardhatNodeServices.blockNumber;
            if (currbn >= bnToProcess) {
                await importJob.importJobExec(bnToProcess);
                await importJob.transformJobExec(bnToProcess);
                log_config_1.backgroundJobLog.debug(() => "\n" + JSON.stringify({ ProcessedBlockNumber: bnToProcess.toString(), CurrentBlockNumber: currbn.toString(), JobId: job.id, JobName: job.name, Message: "success", data: job }) + "\n");
                bnToProcess++;
                noMoreBlockToProcessNotified = false;
            }
            if ((bnToProcess - currbn == 1n) && !noMoreBlockToProcessNotified) {
                log_config_1.backgroundJobLog.info(() => `No more blocks to process | current block number ${currbn.toString()} \n`);
                noMoreBlockToProcessNotified = true;
            }
            // unexpected - restart the indexer
            if (bnToProcess - currbn >= 2n) {
                log_config_1.backgroundJobLog.info(() => `Unexpected current block number ${currbn}. Restart the indexer \n`);
                // delete all data
                await cleardb(importJob.prismaClientServices.prisma);
                log_config_1.backgroundJobLog.info(() => `PROD: db data cleared! \n`);
                bnToProcess = HardhatNodeServices_1.HardhatNodeServices.getFirstBlockNumber();
            }
        }
        catch (error) {
            log_config_1.backgroundJobLog.error(() => "\n" + JSON.stringify({ ProcessedBlockNumber: bnToProcess.toString(), CurrentBlockNumber: currbn.toString(), JobId: job.id, JobName: job.name, Message: error, Data: job }) + "\n");
        }
    }, { connection, autorun: false });
    importW.run();
    importW.on('completed', async (job, returnvalue) => {
    });
    importW.on('failed', async (job, error) => {
        if (job) {
            currbn = await importJob.hardhatNodeServices.blockNumber;
            log_config_1.backgroundJobLog.error(() => "\n" + JSON.stringify({ ProcessedBlockNumber: bnToProcess.toString(), CurrentBlockNumber: currbn.toString(), JobId: job.id, JobName: job.name, Message: error, Data: job }) + "\n");
        }
        log_config_1.backgroundJobLog.info(() => `${importQ.name} paused due to an error above \n`);
        await importQ.pause();
    });
}
async function cleardb(prisma) {
    await prisma.account.deleteMany({});
    await prisma.block.deleteMany({});
    await prisma.transactionReceipt.deleteMany({});
    await prisma.transaction.deleteMany({});
    await prisma.log.deleteMany({});
}
