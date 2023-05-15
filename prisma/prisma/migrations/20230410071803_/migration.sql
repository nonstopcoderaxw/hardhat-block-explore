/*
  Warnings:

  - Added the required column `baseFeePerGas` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraData` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gasLimit` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gasUsed` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `miner` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nonce` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentHash` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Block" ADD COLUMN     "baseFeePerGas" TEXT NOT NULL,
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "extraData" TEXT NOT NULL,
ADD COLUMN     "gasLimit" TEXT NOT NULL,
ADD COLUMN     "gasUsed" TEXT NOT NULL,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "miner" TEXT NOT NULL,
ADD COLUMN     "nonce" TEXT NOT NULL,
ADD COLUMN     "parentHash" TEXT NOT NULL,
ADD COLUMN     "timestamp" BIGINT NOT NULL;
