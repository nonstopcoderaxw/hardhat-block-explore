import { Queue, Worker, Job, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';
import { ImportJob } from "./Jobs";
import { HardhatNodeServices } from "./HardhatNodeServices";
import { PrismaClient, Account } from '@prisma/client';
import { PrismaClientServices } from "./PrismaClientServices";
import { backgroundJobLog as log } from "./log.config";
import { prisma } from "./prismaClient";
import * as dotenv from 'dotenv';
dotenv.config();

main();

type LogMessage = {
  ProcessedBlockNumber: string,
  CurrentBlockNumber: string
  JobId: string,
  JobName: string,
  Message: string | Object,
  Data?: Object
}

async function main() {
  const connection = new IORedis({
      maxRetriesPerRequest: 0
  });

  var bnToProcess: bigint = 0n;
  var noMoreBlockToProcessNotified: boolean = false;
  if (process.env.FROM_FIRST_BLOCK == "0") {
    bnToProcess = HardhatNodeServices.getFirstBlockNumber();
  }

  const importQ = new Queue('importQueue', { connection });
  await importQ.resume();
  
  // cron: every 2 seconds
  // run:  import hh raw data into db
  await importQ.add(
    'import',
    { },
    { 
      removeOnComplete: 100,
      removeOnFail: 100,
      repeat: {
        every: Number(process.env.JOB_SCHEDULE), // every 2 seconds
      },
    }
  );

  const importJob = new ImportJob(
    new HardhatNodeServices(process.env.NODE_ENDPOINT as string), 
    new PrismaClientServices(prisma)
  );

  var currbn: bigint = await importJob.hardhatNodeServices.blockNumber;
  const importW = new Worker("importQueue", async (job: Job) => {
    try{

        // check currentbn and lastbn
        currbn = await importJob.hardhatNodeServices.blockNumber;

        if ( currbn >= bnToProcess ) {
          await importJob.importJobExec(bnToProcess);
          await importJob.transformJobExec(bnToProcess);
          log.debug(() => "\n" + JSON.stringify(({ ProcessedBlockNumber: bnToProcess.toString(), CurrentBlockNumber: currbn.toString(), JobId: job.id, JobName: job.name, Message: "success", data: job} as LogMessage)) + "\n")
          bnToProcess++;
          noMoreBlockToProcessNotified = false;
        }

        if ( (bnToProcess - currbn == 1n ) && !noMoreBlockToProcessNotified ) {
            log.info(()=> `No more blocks to process | current block number ${currbn.toString()} \n`);
            noMoreBlockToProcessNotified = true;
        }

        // unexpected - restart the indexer
        if ( bnToProcess - currbn >= 2n ) {
          log.info(()=> `Unexpected current block number ${currbn}. Restart the indexer \n`);
          // delete all data
          await cleardb(importJob.prismaClientServices.prisma);
          log.info(()=> `PROD: db data cleared! \n`);
          bnToProcess = HardhatNodeServices.getFirstBlockNumber();
        }
    }catch (error: any) {
        log.error(() => "\n" + JSON.stringify(({ ProcessedBlockNumber: bnToProcess.toString(), CurrentBlockNumber: currbn.toString(), JobId: (job as Job).id, JobName: job.name, Message: error as Error, Data: (job as Job)} as LogMessage)) + "\n")
    }
  }, { connection, autorun: false } );

  importW.run();

  importW.on('completed', async (job: Job, returnvalue: any) => {

  });

  importW.on('failed', async (job: Job | undefined, error: Error) => {
    if(job) {
      currbn = await importJob.hardhatNodeServices.blockNumber;
      log.error(() => "\n" + JSON.stringify(({ ProcessedBlockNumber: bnToProcess.toString(), CurrentBlockNumber: currbn.toString(), JobId: (job as Job).id, JobName: job.name, Message: error, Data: (job as Job)} as LogMessage)) + "\n")
    }
    log.info(()=> `${importQ.name} paused due to an error above \n`);
    await importQ.pause();
  });
}


async function cleardb(prisma: PrismaClient) {
    await prisma.account.deleteMany({});
    await prisma.block.deleteMany({});
    await prisma.transactionReceipt.deleteMany({});
    await prisma.transaction.deleteMany({});
    await prisma.log.deleteMany({});
}