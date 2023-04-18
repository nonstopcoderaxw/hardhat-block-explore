"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const prisma_1 = require("./datasources/prisma");
async function startApolloServer() {
    const server = new server_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: resolvers_1.resolvers });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        context: async () => {
            return {
                dataSources: {
                    prisma: prisma_1.prisma,
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
