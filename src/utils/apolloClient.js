import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Constants } from 'expo-constants';

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://192.168.1.33:4000/graphql',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;