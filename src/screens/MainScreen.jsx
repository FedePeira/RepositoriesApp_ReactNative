import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import RepositoryList from '../components/RepositoryListComponent';
import AppBar from '../components/AppBarComponent';
import { Route, Routes } from 'react-router-native';
import RepositoryScreen from './RepositoryScreen';
import SignOutScreen from './SignOutScreen';
import SignInScreen from './SignInScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  appBarContainer: {
    paddingTop: 50,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    paddingTop: 50,
 },
});

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBarContainer}>
        <AppBar/>
      </View>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signout" element={<SignOutScreen />} />
        <Route path="/:id" element={<RepositoryScreen />} />
      </Routes>
    </SafeAreaView>
    
  );
};

export default MainScreen;