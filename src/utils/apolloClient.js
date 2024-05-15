import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-boost';
import { setContext } from '@apollo/client/link/context';
import AuthStorage from './authStorage';

const authStorage = new AuthStorage();

const httpLink = new HttpLink({
  uri: 'http://192.168.1.33:4000/graphql', 
});

const authLink = setContext(async (_, { headers }) => {
  const token = await authStorage.getAccessToken();
  return {
    headers: {
     ...headers,
      authorization: token? `Bearer ${token}` : '',
    },
  };
});

const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;