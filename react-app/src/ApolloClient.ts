import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
const { REACT_APP_GRAGHQL } = process.env;

export const apolloClient = new ApolloClient({
    uri: REACT_APP_GRAGHQL,
    cache: new InMemoryCache(),
});