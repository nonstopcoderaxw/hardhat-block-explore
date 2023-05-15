-- CreateTable
CREATE TABLE "TransactionReceipt" (
    "blockHash" TEXT NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "contractAddress" TEXT,
    "cumulativeGasUsed" BIGINT NOT NULL,
    "fee" BIGINT NOT NULL,
    "from" TEXT NOT NULL,
    "gasPrice" BIGINT NOT NULL,
    "gasUsed" BIGINT NOT NULL,
    "hash" TEXT NOT NULL,
    "index" BIGINT NOT NULL,
    "length" BIGINT NOT NULL,
    "logsBloom" TEXT NOT NULL,
    "root" TEXT NOT NULL,
    "status" BIGINT NOT NULL,
    "to" TEXT NOT NULL,
    "type" BIGINT NOT NULL,

    CONSTRAINT "TransactionReceipt_pkey" PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE "Log" (
    "address" TEXT NOT NULL,
    "blockHash" TEXT NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "data" TEXT NOT NULL,
    "index" BIGINT NOT NULL,
    "removed" BOOLEAN NOT NULL,
    "topics" TEXT[],
    "transactionHash" TEXT NOT NULL,
    "transactionIndex" BIGINT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("transactionHash")
);

-- AddForeignKey
ALTER TABLE "TransactionReceipt" ADD CONSTRAINT "TransactionReceipt_hash_fkey" FOREIGN KEY ("hash") REFERENCES "Transaction"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_transactionHash_fkey" FOREIGN KEY ("transactionHash") REFERENCES "TransactionReceipt"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;
