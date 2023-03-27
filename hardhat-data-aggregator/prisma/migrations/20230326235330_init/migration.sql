/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `address` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(256)`.

*/
-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
ALTER COLUMN "address" SET DATA TYPE CHAR(256),
ALTER COLUMN "balance" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("address");
