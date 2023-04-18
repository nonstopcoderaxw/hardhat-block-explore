import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema"
import { resolvers } from "./resolvers"
import { prisma } from "./datasources/prisma"
import { prisma as prismaDev } from "./datasources/prismaDev"
import { ABIServices } from "./datasources/ABIServices";


async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          prisma: process.env.PROD == "true" ? prisma : prismaDev,
          abiServices: new ABIServices()
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
