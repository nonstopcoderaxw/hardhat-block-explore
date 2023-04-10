import { Queue, Worker, Job, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';
import { ImportJob } from "./Jobs";
import { HardhatNodeServices } from "./HardhatNodeServices";
import { PrismaClient, Account } from '@prisma/client';
import { PrismaClientServices } from "./PrismaClientServices";
import { backgroundJobLog as log } from "../log.config";
import * as dotenv from 'dotenv';
dotenv.config();

main();

type LogMessage = {
  JobId: string,
  JobName: string,
  Message: string | Object,
  Data?: Object
}

async function main() {
  const connection = new IORedis({
      maxRetriesPerRequest: 0
  });

  const importQ = new Queue('importQueue', { connection });
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
    new PrismaClientServices(new PrismaClient())
  );

  const importW = new Worker("importQueue", async (job: Job) => {
    // calling the worker function  
    try{
        await importJob.importJobExec();
    }catch (e: any) {
        throw (e.toString());
    }
  }, { connection, autorun: false } );

  importW.run();

  importW.on('completed', (job: Job, returnvalue: any) => {
    log.debug(() => JSON.stringify(({ JobId: job.id, JobName: job.name, Message: "success", data: job} as LogMessage)))
  });

  importW.on('failed', (job: Job | undefined, error: Error) => {
    if(job) {
      log.error(() => JSON.stringify(({ JobId: (job as Job).id, JobName: job.name, Message: error, Data: (job as Job)} as LogMessage)))
    }
  });
}