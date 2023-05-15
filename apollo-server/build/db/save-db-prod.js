"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../datasources/prisma");
const utils_1 = require("./utils");
async function main() {
    const accounts = await prisma_1.prisma.account.findMany({});
    const blocks = await prisma_1.prisma.block.findMany({});
    const transactions = await prisma_1.prisma.transaction.findMany({});
    const transactionReceipts = await prisma_1.prisma.transactionReceipt.findMany({});
    const logs = await prisma_1.prisma.log.findMany({});
    utils_1.File.write("./src/db/data/accounts.json", JSON.stringify(accounts, null, 4));
    utils_1.File.write("./src/db/data/blocks.json", JSON.stringify(accounts, null, 4));
    utils_1.File.write("./src/db/data/transactions.json", JSON.stringify(accounts, null, 4));
    utils_1.File.write("./src/db/data/transactionReceipts.json", JSON.stringify(accounts, null, 4));
    utils_1.File.write("./src/db/data/logs.json", JSON.stringify(accounts, null, 4));
}
main();
