import React, { useContext } from 'react';
import Button from '../reusableComponents/Button';
import { SafeAreaView, View } from 'react-native-web';
import theme from '../theme';
import useSignOut from '../hooks/useSignOut';

const SignOutScreen = () => {
  const [onSignOut] = useSignOut();
   
  const handleSignOut = async () => {
    console.log('Esta cerrando sesion');
    onSignOut();
  };

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.white, flex: 1}}>
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <View style={{marginVertical: 20}}>
          <Button title="Log Out" onPress={() => handleSignOut()}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignOutScreen;