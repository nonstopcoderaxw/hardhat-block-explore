-- CreateTable
CREATE TABLE "Transaction" (
    "accessList" TEXT,
    "chainId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "fromPublicKey" TEXT NOT NULL,
    "gasLimit" TEXT NOT NULL,
    "gasPrice" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "maxFeePerGas" TEXT NOT NULL,
    "maxPriorityFeePerGas" TEXT NOT NULL,
    "nonce" BIGINT NOT NULL,
    "serialized" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "to" TEXT,
    "type" TEXT NOT NULL,
    "typeName" TEXT NOT NULL,
    "unsignedHash" TEXT NOT NULL,
    "unsignedSerialized" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("hash")
);
