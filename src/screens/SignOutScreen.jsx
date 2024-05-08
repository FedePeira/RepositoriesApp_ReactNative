import React, { useContext } from 'react';
import Button from '../reusableComponents/Button';
import { useApolloClient } from '@apollo/react-hooks';
import AuthStorageContext from '../context/AuthStorageContext';
import { SafeAreaView, View } from 'react-native-web';
import theme from '../theme';
import { Alert } from 'react-native';

const SignOutScreen = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
   
  const handleSignOut = async () => {
    console.log('Esta cerrando sesion');
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
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.white, flex: 1}}>
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        {/* Titulo de Login */}

        <View style={{marginVertical: 20}}>
          <Button title="Log In" onPress={() => handleSignOut()}/>
        </View>
      </View>
    </SafeAreaView>
    
  );
};

export default SignOutScreen;