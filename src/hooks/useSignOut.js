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
    try {
      Alert.alert(
        'Confirmación',
        '¿Estás seguro de que quieres cerrar sesión?',
        [
            {
            text: 'Cancelar',
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
        'Error al cerrar sesion',
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