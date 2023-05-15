/*
  Warnings:

  - Added the required column `blockNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "blockNumber" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "Block" (
    "baseFeePerGas" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "difficulty" TEXT NOT NULL,
    "extraData" TEXT NOT NULL,
    "gasLimit" TEXT NOT NULL,
    "gasUsed" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "miner" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "number" BIGINT NOT NULL,
    "parentHash" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("number")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_blockNumber_fkey" FOREIGN KEY ("blockNumber") REFERENCES "Block"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
