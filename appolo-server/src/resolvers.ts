export const resolvers = {
  Query: {
  
    accounts: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.primsa.account.findMany({
        where: {
          isContract: false
        }
      });
    },

    account: async (_: any, { address }: any, { dataSources }: any) => {
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

    contracts: async (_: any, { address }: any, { dataSources }: any) => {
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

    transactions: (_: any, __: any, { dataSources }: any) => {
      return dataSources.primsa.transaction.findMany({});
    },

    transaction: (_: any, { hash }: any, { dataSources }: any) => {
      return dataSources.primsa.transaction.findUnique({
        where: {
          hash: hash
        }
      });
    },

    blocks: (_: any, __: any, { dataSources }: any) => {
      return dataSources.primsa.block.findMany({});
    },

    block: (_: any, { number }: any, { dataSources }: any) => {
      return dataSources.primsa.block.findUnique({
        where: {
          number: number
        }
      });
    },

  },

  Block: {
    
  },

  Account: {
    transactions: ({ address }: any, __: any, { dataSources }: any) => {
      return dataSources.primsa.transaction.findMany({
        where: {
          from: address
        }
      })
    }
  },

  Transaction: {
    transactionReceipt: ({ hash }: any, __: any, { dataSources }: any) => {
      return dataSources.primsa.transactionReceipt.findUnique({
        where: {
          hash: hash
        }
      })
    }
  },

  TransactionReceipt: {
    logs: ({ hash }: any, __: any, { dataSources }: any) => {
      return dataSources.primsa.log.findMany({
        where: {
          transactionHash: hash
        }
      })
    }
  },

  Log: {
    
  }
};

