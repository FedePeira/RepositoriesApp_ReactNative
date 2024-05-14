import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import AppBar from '../components/AppBarComponent';
import { Route, Routes, useNavigate } from 'react-router-native';
import RepositoryScreen from './RepositoryScreen';
import SignOutScreen from './SignOutScreen';
import SignInScreen from './SignInScreen';
import ReviewFormScreen from './ReviewFormScreen';
import RegisterFormScreen from './RegisterFormScreen';
import RepositoryListContainer from '../components/RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';
import useLoadingAndError from '../hooks/useLoadingAndError';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  appBarContainer: {
    paddingTop: 50,
  },
});

const MainScreen = () => {
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, loading, error } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);
  const { isLoading, hasError } = useLoadingAndError(loading, error);

  const navigate = useNavigate();
  const navigateToRepository = (id) => navigate(`/${id}`);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBarContainer}>
        <AppBar/>
      </View>
      <Routes>
        <Route path="/" element={<RepositoryListContainer 
          navigate={navigateToRepository} 
          repositories={repositories} 
          isLoading={isLoading}
          hasError={hasError}
          setOrderBy={setOrderBy}
          setOrderDirection={setOrderDirection}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />} />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signout" element={<SignOutScreen />} />
        <Route path="/:id" element={<RepositoryScreen />} />
        <Route path="/createreview" element={<ReviewFormScreen />} />
        <Route path="/register" element={<RegisterFormScreen />} />
      </Routes>
    </SafeAreaView>
    
  );
};

export default MainScreen;