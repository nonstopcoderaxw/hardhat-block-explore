/*
  Warnings:

  - Added the required column `chainId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gasLimit` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gasPrice` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxFeePerGas` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPriorityFeePerGas` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nonce` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `r` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `v` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "accessList" TEXT[],
ADD COLUMN     "chainId" TEXT NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "from" TEXT NOT NULL,
ADD COLUMN     "gasLimit" TEXT NOT NULL,
ADD COLUMN     "gasPrice" TEXT NOT NULL,
ADD COLUMN     "maxFeePerGas" TEXT NOT NULL,
ADD COLUMN     "maxPriorityFeePerGas" TEXT NOT NULL,
ADD COLUMN     "nonce" BIGINT NOT NULL,
ADD COLUMN     "r" TEXT NOT NULL,
ADD COLUMN     "s" TEXT NOT NULL,
ADD COLUMN     "to" TEXT,
ADD COLUMN     "type" BIGINT NOT NULL,
ADD COLUMN     "v" BIGINT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
