import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema"
import { resolvers } from "./resolvers"
import { prisma } from "./datasources/prisma"
import { prisma as prismaDev } from "./datasources/prismaDev"
import { ABIServices } from "./datasources/ABIServices";
import { HardhatNodeServices } from "./datasources/HardhatNodeServices";


const localPlugin = {
  
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers, plugins: [ localPlugin ] });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          prisma: process.env.PROD == "true" ? prisma : prismaDev,
          abiServices: new ABIServices(),
          hardhatNodeServices: new HardhatNodeServices(process.env.NODE_ENDPOINT!)
        },
      };
    },
    listen: { port: process.env.PROD == "true" ? 4000 : 4001 },
  }); 

  console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
}

startApolloServer();
