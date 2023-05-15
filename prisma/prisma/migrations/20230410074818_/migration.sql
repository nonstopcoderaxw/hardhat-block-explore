/*
  Warnings:

  - Added the required column `blockHash` to the `TransactionReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockNumber` to the `TransactionReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cumulativeGasUsed` to the `TransactionReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from` to the `TransactionReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gasPrice` to the `TransactionReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gasUsed` to the `TransactionReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `index` to the `TransactionReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logsBloom` to the `TransactionReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `TransactionReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `TransactionReceipt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionReceipt" ADD COLUMN     "blockHash" TEXT NOT NULL,
ADD COLUMN     "blockNumber" BIGINT NOT NULL,
ADD COLUMN     "contractAddress" TEXT,
ADD COLUMN     "cumulativeGasUsed" TEXT NOT NULL,
ADD COLUMN     "from" TEXT NOT NULL,
ADD COLUMN     "gasPrice" TEXT NOT NULL,
ADD COLUMN     "gasUsed" TEXT NOT NULL,
ADD COLUMN     "index" BIGINT NOT NULL,
ADD COLUMN     "logsBloom" TEXT NOT NULL,
ADD COLUMN     "status" BIGINT NOT NULL,
ADD COLUMN     "to" TEXT NOT NULL;
