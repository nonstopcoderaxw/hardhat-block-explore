"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        accounts: async (_, __, { dataSources }) => {
            return dataSources.primsa.account.findMany({
                where: {
                    isContract: false
                }
            });
        },
        account: async (_, { address }, { dataSources }) => {
            const accounts = await dataSources.primsa.account.findMany({
                where: {
                    AND: [
                        { address: address },
                        { isContract: false }
                    ]
                }
            });
            return accounts[0];
        },
        contracts: async (_, { address }, { dataSources }) => {
            const contracts = await dataSources.primsa.account.findMany({
                where: {
                    AND: [
                        { address: address },
                        { isContract: true }
                    ]
                }
            });
            return contracts[0];
        },
        transactions: (_, __, { dataSources }) => {
            return dataSources.primsa.transaction.findMany({});
        },
        transaction: (_, { hash }, { dataSources }) => {
            return dataSources.primsa.transaction.findUnique({
                where: {
                    hash: hash
                }
            });
        },
        blocks: (_, __, { dataSources }) => {
            return dataSources.primsa.block.findMany({});
        },
        block: (_, { number }, { dataSources }) => {
            return dataSources.primsa.block.findUnique({
                where: {
                    number: number
                }
            });
        },
    },
    Block: {},
    Account: {
        transactions: ({ address }, __, { dataSources }) => {
            return dataSources.primsa.transaction.findMany({
                where: {
                    from: address
                }
            });
        }
    },
    Transaction: {
        transactionReceipt: ({ hash }, __, { dataSources }) => {
            return dataSources.primsa.transactionReceipt.findUnique({
                where: {
                    hash: hash
                }
            });
        }
    },
    TransactionReceipt: {
        logs: ({ hash }, __, { dataSources }) => {
            return dataSources.primsa.log.findMany({
                where: {
                    transactionHash: hash
                }
            });
        }
    },
    Log: {}
};
