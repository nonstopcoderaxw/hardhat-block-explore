/*
  Warnings:

  - Added the required column `isContract` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "abi" TEXT,
ADD COLUMN     "isContract" BOOLEAN NOT NULL;
