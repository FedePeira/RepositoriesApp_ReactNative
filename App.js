import Main from './src/screens/MainScreen';
import { NativeRouter } from 'react-router-native';
import React from 'react';

const App = () => {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
};

export default App;