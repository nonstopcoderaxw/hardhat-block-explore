"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        accounts: async (_, __, { dataSources }) => {
            return dataSources.prisma.account.findMany({
                where: {
                    isContract: false
                },
                orderBy: [
                    {
                        address: 'desc',
                    }
                ]
            });
        },
        account: async (_, { address }, { dataSources }) => {
            const accounts = await dataSources.prisma.account.findMany({
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
            return dataSources.prisma.account.findMany({
                where: {
                    isContract: true
                },
                orderBy: [
                    {
                        address: 'desc',
                    }
                ]
            });
        },
        contract: async (_, { address }, { dataSources }) => {
            const contracts = await dataSources.prisma.account.findMany({
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
            return dataSources.prisma.transaction.findMany({
                include: {
                    transactionReceipt: {
                        include: {
                            logs: true
                        }
                    },
                    block: true
                },
                orderBy: [
                    {
                        blockNumber: 'desc',
                    }
                ],
            });
        },
        transaction: (_, { hash }, { dataSources }) => {
            return dataSources.prisma.transaction.findUnique({
                where: {
                    hash: hash
                },
                include: {
                    transactionReceipt: {
                        include: {
                            logs: true
                        }
                    },
                    block: true
                }
            });
        },
        blocks: async (_, __, { dataSources }) => {
            return dataSources.prisma.block.findMany({
                include: {
                    transactions: {
                        include: {
                            transactionReceipt: {
                                include: {
                                    logs: true
                                }
                            }
                        }
                    }
                },
                orderBy: [
                    {
                        timestamp: 'desc',
                    }
                ],
            });
        },
        block: (_, { number }, { dataSources }) => {
            return dataSources.prisma.block.findUnique({
                where: {
                    number: BigInt(number)
                },
                include: {
                    transactions: {
                        include: {
                            transactionReceipt: {
                                include: {
                                    logs: true
                                }
                            }
                        }
                    }
                }
            });
        },
        abi: async (_, { address, cache }, { dataSources }) => {
            return JSON.stringify(await dataSources.abiServices.findABI(address, cache.toString()));
        },
    },
    Mutation: {
        importABIs: async (_, { addresses, names, abis }, { dataSources }) => {
            await dataSources.abiServices.importABIs(addresses, names, abis);
            return {
                status: "200"
            };
        },
        hh_send: (_, { data, value, from, to }, { dataSources }) => {
            return dataSources.hardhatNodeServices.send(data, value, from, to);
        },
        hh_read: (_, { contractAddress, funcName, abi, params, address }, { dataSources }) => {
            return dataSources.hardhatNodeServices.read(contractAddress, funcName, abi, params, address);
        },
    },
    RestResponse: {},
    Block: {
        nonce: ({ nonce }, __, { dataSources }) => {
            return Number(nonce.toString());
        },
        number: ({ number }, __, { dataSources }) => {
            return Number(number.toString());
        },
        timestamp: ({ timestamp }, __, { dataSources }) => {
            return Number(timestamp.toString());
        },
    },
    Account: {
        transactions: ({ address }, __, { dataSources }) => {
            return dataSources.prisma.transaction.findMany({
                where: {
                    from: address
                },
                orderBy: [
                    {
                        blockNumber: 'desc',
                    }
                ],
                include: {
                    transactionReceipt: {
                        include: {
                            logs: true
                        }
                    }
                },
            });
        },
        abi: async ({ address }, __, { dataSources }) => {
            try {
                const res = await dataSources.abiServices.findABI(address, "true");
                return JSON.stringify(res.abi);
            }
            catch {
                return undefined;
            }
            const res = await dataSources.abiServices.findABI(address, "true");
            return JSON.stringify(res.abi);
        },
        name: async ({ address }, __, { dataSources }) => {
            try {
                const res = await dataSources.abiServices.findABI(address, "true");
                return res.name;
            }
            catch {
                return undefined;
            }
        },
    },
    Transaction: {
        blockNumber: ({ blockNumber }, __, { dataSources }) => {
            return Number(blockNumber.toString());
        },
        chainId: ({ chainId }, __, { dataSources }) => {
            return Number(chainId.toString());
        },
        nonce: ({ nonce }, __, { dataSources }) => {
            return Number(nonce.toString());
        },
        type: ({ type }, __, { dataSources }) => {
            return Number(type.toString());
        },
        v: ({ v }, __, { dataSources }) => {
            return Number(v.toString());
        },
    },
    TransactionReceipt: {
        blockNumber: ({ blockNumber }, __, { dataSources }) => {
            return Number(blockNumber.toString());
        },
        index: ({ index }, __, { dataSources }) => {
            return Number(index.toString());
        },
    },
    Log: {
        blockNumber: ({ blockNumber }, __, { dataSources }) => {
            return Number(blockNumber.toString());
        },
        index: ({ index }, __, { dataSources }) => {
            return Number(index.toString());
        },
        decodedLog: async ({ address, data, topics }, __, { dataSources }) => {
            const log = {
                address: address,
                data: data,
                topics: topics
            };
            try {
                const decodedLog = await dataSources.abiServices.decodeLogs([address], [log]);
                if (decodedLog && decodedLog.length == 1)
                    return JSON.stringify(decodedLog[0]);
                throw (new Error("DECODED_LOGS_FAILED"));
            }
            catch (e) {
                throw (e);
            }
        },
    },
};
