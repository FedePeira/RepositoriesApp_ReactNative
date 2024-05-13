import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, ActivityIndicator } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../reusableComponents/Text';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import AuthStorageContext from '../context/AuthStorageContext';
import useLoadingAndError from '../hooks/useLoadingAndError';

const styles = StyleSheet.create({
  text: {
    padding: 10
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#333', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, error, loading, refetch } = useQuery(ME);
  const { isLoading, hasError } = useLoadingAndError(loading, error);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = await authStorage.isAuthenticated();
      setIsAuthenticated(authStatus);
    };

    checkAuthStatus();
    const unsubscribe = authStorage.subscribe(checkAuthStatus);

    return () => {
      unsubscribe();
    };  }, [authStorage, refetch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.errorContainer}>
        <Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error: {error.message}</Text>
      </View>
    );
  }

  console.log(data);

  return(
    <TouchableWithoutFeedback>
      <View style={styles.navigation}>
        <ScrollView horizontal>
          <Link to="/">
            <Text color='white' style={styles.text}>Repositories</Text>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/createreview">
                <Text color='white' style={styles.text}>Create Review</Text>
              </Link>
              <Link to="/signout">
                <Text color='white' style={styles.text}>Sign Out</Text>
              </Link>
            </>   
          ) : (
            <Link to="/signin">
              <Text color='white' style={styles.text}>Sign In</Text>
            </Link>          
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  ); 
};

export default AppBar;