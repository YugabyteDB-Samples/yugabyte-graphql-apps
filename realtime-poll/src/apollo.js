// Remove the apollo-boost import and change to this:
import ApolloClient from "apollo-client";

// Setup the network "links"
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import { InMemoryCache } from 'apollo-cache-inmemory';

export const HASURA_GRAPHQL_ENGINE_HOSTNAME = 'hasura-yb-demo.hasura.app';

const scheme = (proto) => {
  return window.location.protocol === 'https:' ? `${proto}s` : proto;
}



const wssurl = `${scheme('wss')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
const httpsurl = `${scheme('https')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
const hasura_secret = 'pCf2Hpo0FojxMoQF1wuwaX16dcYb7mo3HodnUBSlvLULqb93fkdv4GDVNjr5HcHD';

// ** http connection for localhost **
// const wsurl = `${scheme('ws')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
// const httpurl = `${scheme('http')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
// 
// const wsLink = new WebSocketLink({
//   uri: wsurl,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       headers: {
//         'content-type': 'application/json',
//          'x-hasura-admin-secret': hasura_secret
//       }
//     }
//   }
// });
// 
// const httpLink = new HttpLink({
//   uri: httpurl,
//   headers: {
//     'content-type': 'application/json',
//     'x-hasura-admin-secret': hasura_secret
//   }
// });

const httpsLink = new HttpLink({
  uri: httpsurl,
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': hasura_secret
  }
});

const wssLink = new WebSocketLink({
  uri: wssurl,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'content-type': 'application/json',
         'x-hasura-admin-secret': hasura_secret
      }
    }
  }
});


const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wssLink,
  httpsLink
  // wsLink,
  // httpLink
);

const createApolloClient = () => {
  return new ApolloClient({
    link,
    cache: new InMemoryCache()
  });
};


const client = createApolloClient();

export default client;
