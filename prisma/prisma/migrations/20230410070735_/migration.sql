/*
  Warnings:

  - You are about to drop the column `baseFeePerGas` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `extraData` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `gasLimit` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `gasUsed` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `miner` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `nonce` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `parentHash` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `blockHash` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `blockNumber` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `topics` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `accessList` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `chainId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `gasLimit` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `gasPrice` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `maxFeePerGas` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `maxPriorityFeePerGas` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `nonce` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `r` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `s` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `v` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `blockHash` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `blockNumber` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `contractAddress` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `cumulativeGasUsed` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `gasPrice` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `gasUsed` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `logsBloom` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `TransactionReceipt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "baseFeePerGas",
DROP COLUMN "difficulty",
DROP COLUMN "extraData",
DROP COLUMN "gasLimit",
DROP COLUMN "gasUsed",
DROP COLUMN "hash",
DROP COLUMN "miner",
DROP COLUMN "nonce",
DROP COLUMN "parentHash",
DROP COLUMN "timestamp";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "address",
DROP COLUMN "blockHash",
DROP COLUMN "blockNumber",
DROP COLUMN "data",
DROP COLUMN "topics";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "accessList",
DROP COLUMN "chainId",
DROP COLUMN "data",
DROP COLUMN "from",
DROP COLUMN "gasLimit",
DROP COLUMN "gasPrice",
DROP COLUMN "maxFeePerGas",
DROP COLUMN "maxPriorityFeePerGas",
DROP COLUMN "nonce",
DROP COLUMN "r",
DROP COLUMN "s",
DROP COLUMN "to",
DROP COLUMN "type",
DROP COLUMN "v",
DROP COLUMN "value";

-- AlterTable
ALTER TABLE "TransactionReceipt" DROP COLUMN "blockHash",
DROP COLUMN "blockNumber",
DROP COLUMN "contractAddress",
DROP COLUMN "cumulativeGasUsed",
DROP COLUMN "from",
DROP COLUMN "gasPrice",
DROP COLUMN "gasUsed",
DROP COLUMN "index",
DROP COLUMN "logsBloom",
DROP COLUMN "status",
DROP COLUMN "to";
