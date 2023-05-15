/*
  Warnings:

  - The primary key for the `Block` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `number` on the `Block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nonce` on the `Block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `timestamp` on the `Block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `index` on the `Log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `blockNumber` on the `Log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `blockNumber` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nonce` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `v` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `chainId` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `blockNumber` on the `TransactionReceipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `index` on the `TransactionReceipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_blockNumber_fkey";

-- AlterTable
ALTER TABLE "Block" DROP CONSTRAINT "Block_pkey",
DROP COLUMN "number",
ADD COLUMN     "number" BIGINT NOT NULL,
DROP COLUMN "nonce",
ADD COLUMN     "nonce" BIGINT NOT NULL,
DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" BIGINT NOT NULL,
ADD CONSTRAINT "Block_pkey" PRIMARY KEY ("number");

-- AlterTable
ALTER TABLE "Log" DROP CONSTRAINT "Log_pkey",
DROP COLUMN "index",
ADD COLUMN     "index" BIGINT NOT NULL,
DROP COLUMN "blockNumber",
ADD COLUMN     "blockNumber" BIGINT NOT NULL,
ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("transactionHash", "index");

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "blockNumber",
ADD COLUMN     "blockNumber" BIGINT NOT NULL,
DROP COLUMN "nonce",
ADD COLUMN     "nonce" BIGINT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" BIGINT NOT NULL,
DROP COLUMN "v",
ADD COLUMN     "v" BIGINT NOT NULL,
DROP COLUMN "chainId",
ADD COLUMN     "chainId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "TransactionReceipt" DROP COLUMN "blockNumber",
ADD COLUMN     "blockNumber" BIGINT NOT NULL,
DROP COLUMN "index",
ADD COLUMN     "index" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_blockNumber_fkey" FOREIGN KEY ("blockNumber") REFERENCES "Block"("number") ON DELETE CASCADE ON UPDATE CASCADE;
