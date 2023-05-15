/*
  Warnings:

  - Added the required column `address` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockHash` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockNumber` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "blockHash" TEXT NOT NULL,
ADD COLUMN     "blockNumber" BIGINT NOT NULL,
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "topics" TEXT[];
