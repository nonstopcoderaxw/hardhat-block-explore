/*
  Warnings:

  - You are about to drop the column `accessList` on the `Transaction` table. All the data in the column will be lost.
  - Changed the type of `chainId` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gasLimit` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gasPrice` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `maxFeePerGas` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `maxPriorityFeePerGas` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `value` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cumulativeGasUsed` on the `TransactionReceipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gasPrice` on the `TransactionReceipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gasUsed` on the `TransactionReceipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "accessList",
DROP COLUMN "chainId",
ADD COLUMN     "chainId" BIGINT NOT NULL,
DROP COLUMN "gasLimit",
ADD COLUMN     "gasLimit" BIGINT NOT NULL,
DROP COLUMN "gasPrice",
ADD COLUMN     "gasPrice" BIGINT NOT NULL,
DROP COLUMN "maxFeePerGas",
ADD COLUMN     "maxFeePerGas" BIGINT NOT NULL,
DROP COLUMN "maxPriorityFeePerGas",
ADD COLUMN     "maxPriorityFeePerGas" BIGINT NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "TransactionReceipt" DROP COLUMN "cumulativeGasUsed",
ADD COLUMN     "cumulativeGasUsed" BIGINT NOT NULL,
DROP COLUMN "gasPrice",
ADD COLUMN     "gasPrice" BIGINT NOT NULL,
DROP COLUMN "gasUsed",
ADD COLUMN     "gasUsed" BIGINT NOT NULL;
