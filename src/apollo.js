import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
    uri: import.meta.env.VITE_HASURA_URI,
    headers: {
        'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN_SECRET
    }
})

const wsLink = new GraphQLWsLink(createClient({
  url: import.meta.env.VITE_HASURA_WS_URI,
  connectionParams : {
    headers: {
        'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN_SECRET
    }
  }
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})