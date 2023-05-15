import { Log } from "./datasources/ABIServices";

export const resolvers = {
  Query: {

    accounts: async (_: any, __: any, { dataSources }: any) => {
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

    account: async (_: any, { address }: any, { dataSources }: any) => {
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

    contracts: async (_: any, { address }: any, { dataSources }: any) => {
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

    contract: async (_: any, { address }: any, { dataSources }: any) => {
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

    transactions: (_: any, __: any, { dataSources }: any) => {
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

    transaction: (_: any, { hash }: any, { dataSources }: any) => {
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

    blocks: async (_: any, __: any, { dataSources }: any) => {
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

    block: (_: any, { number }: any, { dataSources }: any) => {
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

    abi: async (_: any, { address, cache }: any, { dataSources }: any) => {
      return JSON.stringify(await dataSources.abiServices.findABI(address, cache.toString()));
    },

    profile: async (_: any, __: any, { dataSources }: any) => {
      return {
        blockNumber: await dataSources.hardhatNodeServices.blockNumber()
      }
    },
  },

  Mutation: {
    importABIs: async (_: any, { addresses, names, abis }: any, { dataSources }: any) => {
      await dataSources.abiServices.importABIs(addresses, names, abis);
      return {
          status: "200"
      }
    },
    hh_send: (_: any, { data, value, from, to }: any, { dataSources }: any) => {
      return dataSources.hardhatNodeServices.send(data, value, from, to);
    },
    hh_read: (_: any, { contractAddress, funcName, abi, params, blockTag, address }: any, { dataSources }: any) => {
      return dataSources.hardhatNodeServices.read(contractAddress, funcName, abi, params, blockTag, address);
    },
  },

  RestResponse: {
   
  },

  Profile: {
    
  },

  Block: {
    nonce: ({ nonce }: any, __: any, { dataSources }: any) => {
      return Number(nonce.toString())
    },
    number: ({ number }: any, __: any, { dataSources }: any) => {
      return Number(number.toString())
    },
    timestamp: ({ timestamp }: any, __: any, { dataSources }: any) => {
      return Number(timestamp.toString())
    },
  },

  Account: {
    transactions: ({ address }: any, __: any, { dataSources }: any) => {
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
      })
    },
    abi: async ({ address }: any, __: any, { dataSources }: any) => {
      try {
        const res = await dataSources.abiServices.findABI(address, "true");
        return JSON.stringify(res.abi);
      } catch {
        return undefined;
      }
      const res = await dataSources.abiServices.findABI(address, "true");
      return JSON.stringify(res.abi);
    },
    name: async ({ address }: any, __: any, { dataSources }: any) => {
      try {
        const res = await dataSources.abiServices.findABI(address, "true");
        return res.name;
      } catch {
        return undefined;
      }
    },
  },

  Transaction: {
    blockNumber: ({ blockNumber }: any, __: any, { dataSources }: any) => {
      return Number(blockNumber.toString())
    },
    chainId: ({ chainId }: any, __: any, { dataSources }: any) => {
      return Number(chainId.toString())
    },
    nonce: ({ nonce }: any, __: any, { dataSources }: any) => {
      return Number(nonce.toString())
    },
    type: ({ type }: any, __: any, { dataSources }: any) => {
      return Number(type.toString())
    },
    v: ({ v }: any, __: any, { dataSources }: any) => {
      return Number(v.toString())
    },
  },

  TransactionReceipt: {
    blockNumber: ({ blockNumber }: any, __: any, { dataSources }: any) => {
      return Number(blockNumber.toString())
    },
    index: ({ index }: any, __: any, { dataSources }: any) => {
      return Number(index.toString())
    },
  },

  Log: {
    blockNumber: ({ blockNumber }: any, __: any, { dataSources }: any) => {
      return Number(blockNumber.toString())
    },
    index: ({ index }: any, __: any, { dataSources }: any) => {
      return Number(index.toString())
    },
    decodedLog: async ({ address, data, topics }: any, __: any, { dataSources }: any) => {
      const log: Log = {
        address: address,
        data: data,
        topics: topics
      }

      try {
          const decodedLog = await dataSources.abiServices.decodeLogs(
            [ address ],
            [ log ]
          );

          if (decodedLog && decodedLog.length == 1) return JSON.stringify(decodedLog[0]);

          throw (new Error("DECODED_LOGS_FAILED"));
      } catch (e: any) {
          throw (e);
      }
      
    },
  },


};

