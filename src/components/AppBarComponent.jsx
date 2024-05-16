import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, ActivityIndicator } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../reusableComponents/Text';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import AuthStorageContext from '../context/AuthStorageContext';
import useLoadingAndError from '../hooks/useLoadingAndError';
import AppBarStyles from '../styles/components/AppBarComponent';
import ReusableStyles from '../styles/ReusableStyles';

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
      <View style={ReusableStyles.loadingContainer}>
        <ActivityIndicator style={ReusableStyles.indicator} />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={ReusableStyles.errorContainer}>
        <Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error: {error.message}</Text>
      </View>
    );
  }

  return(
    <TouchableWithoutFeedback>
      <View style={AppBarStyles.navigation}>
        <ScrollView horizontal>
          <Link to="/">
            <Text color='white' style={AppBarStyles.text}>Repositories</Text>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/createreview">
                <Text color='white' style={AppBarStyles.text}>Create Review</Text>
              </Link>
              <Link to="/myreviews">
                <Text color='white' style={AppBarStyles.text}>My Reviews</Text>
              </Link>
              <Link to="/signout">
                <Text color='white' style={AppBarStyles.text}>Sign Out</Text>
              </Link>
            </>   
          ) : (
            <>
              <Link to="/register">
                <Text color='white' style={AppBarStyles.text}>Register</Text>
              </Link>    
              <Link to="/signin">
                <Text color='white' style={AppBarStyles.text}>Sign In</Text>
              </Link>   
            </>     
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  ); 
};

export default AppBar;