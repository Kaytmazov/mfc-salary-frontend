import { GraphQLClient, gql } from 'graphql-request';

import { getAccessToken } from '../services/authService';

const endpoint = process.env.REACT_APP_API_URL;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: getAccessToken(),
  },
});

export { graphQLClient, gql };
