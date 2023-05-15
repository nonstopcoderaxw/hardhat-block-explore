/*
  Warnings:

  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "TransactionReceipt" DROP CONSTRAINT "TransactionReceipt_hash_fkey";

-- AlterTable
ALTER TABLE "Log" DROP CONSTRAINT "Log_pkey",
ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("transactionHash", "index");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_hash_fkey" FOREIGN KEY ("hash") REFERENCES "TransactionReceipt"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;
