/*
  Warnings:

  - You are about to drop the column `data` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `removed` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `fromPublicKey` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `serialized` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `typeName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `unsignedHash` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `unsignedSerialized` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `fee` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `root` on the `TransactionReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `TransactionReceipt` table. All the data in the column will be lost.
  - Added the required column `r` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `v` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "data";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "removed";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "fromPublicKey",
DROP COLUMN "serialized",
DROP COLUMN "typeName",
DROP COLUMN "unsignedHash",
DROP COLUMN "unsignedSerialized",
ADD COLUMN     "r" TEXT NOT NULL,
ADD COLUMN     "s" TEXT NOT NULL,
ADD COLUMN     "v" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "TransactionReceipt" DROP COLUMN "fee",
DROP COLUMN "length",
DROP COLUMN "root",
DROP COLUMN "type";
