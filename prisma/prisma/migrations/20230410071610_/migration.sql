-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_transactionHash_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_blockNumber_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_hash_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_blockNumber_fkey" FOREIGN KEY ("blockNumber") REFERENCES "Block"("number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_hash_fkey" FOREIGN KEY ("hash") REFERENCES "TransactionReceipt"("hash") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_transactionHash_fkey" FOREIGN KEY ("transactionHash") REFERENCES "TransactionReceipt"("hash") ON DELETE CASCADE ON UPDATE CASCADE;
