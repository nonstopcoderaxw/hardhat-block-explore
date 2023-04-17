"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../datasources/prisma");
async function main() {
    const accounts = await prisma_1.prisma.account.findMany({});
    const blocks = await prisma_1.prisma.block.findMany({});
    const transactions = await prisma_1.prisma.transaction.findMany({});
    const transactionReceipts = await prisma_1.prisma.transactionReceipt.findMany({});
    const logs = await prisma_1.prisma.log.findMany({});
}
main();
