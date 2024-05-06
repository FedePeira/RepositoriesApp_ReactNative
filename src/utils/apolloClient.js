import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-boost';

const httpLink = new HttpLink({
  uri: 'http://192.168.1.33:4000/graphql', 
});

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;