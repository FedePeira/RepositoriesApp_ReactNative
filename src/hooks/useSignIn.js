import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutation';
import { useContext } from 'react';
import AuthStorageContext from '../context/AuthStorageContext';
import { useNavigate } from 'react-router-native';
import { Alert } from 'react-native';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [signIn, { data, loading, error }] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient(); 
  const navigate = useNavigate();

  const onSignIn = async ({ username, password }) => {
    console.log('Iniciando Sesion...')
    try {
      const { data } = await signIn({ variables: { username, password } });
      console.log('Data: ', data);
      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();
      authStorage.notifySubscribers();
      navigate('/');
      Alert.alert(
        'Successful login',
        'You have logged in successfully.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { type: 'plain-text', cancelable: false }
      );
    } catch (error) {
      console.error("Error al autenticar:", error);
      Alert.alert(
        'Failed to login',
        'Please verify your credentials.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { type: 'plain-text', cancelable: false }
      );
    }
  };

  return [onSignIn, { data, loading, error }];
};

export default useSignIn;