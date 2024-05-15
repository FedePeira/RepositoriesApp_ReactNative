import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutation';
import { useNavigate } from 'react-router-native';
import { Alert } from 'react-native';

const useRegister = () => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const apolloClient = useApolloClient(); 
  const navigate = useNavigate();

  const createUserMutation = async ({ username, password }) => {
    console.log(username, password)
    console.log('Registrando...')
    try {
      const { data } = await createUser({ variables: { username, password } });
      console.log('Data: ', data);
      await apolloClient.resetStore();
      navigate('/');
      Alert.alert(
        'Successful registration',
        'You have successfully registered.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { type: 'plain-text', cancelable: false }
      );
    } catch (error) {
      console.error("Error al registrarse:", error);
      Alert.alert(
        'Error registering',
        'Please verify your credentials.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { type: 'plain-text', cancelable: false }
      );
    }
  };

  return [createUserMutation, { data, loading, error }];
};

export default useRegister;