import { useContext } from 'react';
import AuthStorageContext from '../context/AuthStorageContext';
import { useNavigate } from 'react-router-native';
import { Alert } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';

const useSignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient(); 
  const navigate = useNavigate();

  const onSignOut = async () => {
    console.log('Cerrando sesion...')
    try {
      Alert.alert(
        'Confirm',
        'Are you sure you want to log out?',
        [
            {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
            },
            {
            text: 'OK',
            onPress: async () => {
                console.log('Cerro Sesion');
                await authStorage.removeAccessToken();
                await apolloClient.resetStore();
                authStorage.notifySubscribers();
                navigate('/');
            },
            },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error al cerrar sesion:", error);
      Alert.alert(
        'Error when closing session',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { type: 'plain-text', cancelable: false }
      );
    }
  };

  return [onSignOut];
};

export default useSignOut;