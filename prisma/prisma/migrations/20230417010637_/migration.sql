/*
  Warnings:

  - The primary key for the `Block` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_blockNumber_fkey";

-- AlterTable
ALTER TABLE "Block" DROP CONSTRAINT "Block_pkey",
ALTER COLUMN "number" SET DATA TYPE TEXT,
ALTER COLUMN "timestamp" SET DATA TYPE TEXT,
ALTER COLUMN "baseFeePerGas" SET DATA TYPE TEXT,
ALTER COLUMN "difficulty" SET DATA TYPE TEXT,
ALTER COLUMN "gasLimit" SET DATA TYPE TEXT,
ALTER COLUMN "gasUsed" SET DATA TYPE TEXT,
ADD CONSTRAINT "Block_pkey" PRIMARY KEY ("number");

-- AlterTable
ALTER TABLE "Log" DROP CONSTRAINT "Log_pkey",
ALTER COLUMN "index" SET DATA TYPE TEXT,
ALTER COLUMN "transactionIndex" SET DATA TYPE TEXT,
ALTER COLUMN "blockNumber" SET DATA TYPE TEXT,
ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("transactionHash", "index");

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "blockNumber" SET DATA TYPE TEXT,
ALTER COLUMN "nonce" SET DATA TYPE TEXT,
ALTER COLUMN "type" SET DATA TYPE TEXT,
ALTER COLUMN "v" SET DATA TYPE TEXT,
ALTER COLUMN "chainId" SET DATA TYPE TEXT,
ALTER COLUMN "gasLimit" SET DATA TYPE TEXT,
ALTER COLUMN "gasPrice" SET DATA TYPE TEXT,
ALTER COLUMN "maxFeePerGas" SET DATA TYPE TEXT,
ALTER COLUMN "maxPriorityFeePerGas" SET DATA TYPE TEXT,
ALTER COLUMN "value" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TransactionReceipt" ALTER COLUMN "blockNumber" SET DATA TYPE TEXT,
ALTER COLUMN "index" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DATA TYPE TEXT,
ALTER COLUMN "cumulativeGasUsed" SET DATA TYPE TEXT,
ALTER COLUMN "gasPrice" SET DATA TYPE TEXT,
ALTER COLUMN "gasUsed" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_blockNumber_fkey" FOREIGN KEY ("blockNumber") REFERENCES "Block"("number") ON DELETE CASCADE ON UPDATE CASCADE;
