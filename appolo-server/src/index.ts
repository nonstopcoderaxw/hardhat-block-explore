import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema"
import { resolvers } from "./resolvers"
import { primsa } from "./datasources/primsa"

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          primsa: primsa,
        },
      };
    },
  }); 

  console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
}

startApolloServer();
