"use strict";
const resolvers = {
    Query: {
        accounts: (_, __, { dataSources }) => {
            return dataSources.primsa.account.findMany({});
        },
    }
};
