import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../reusableComponents/Text';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import AuthStorageContext from '../context/AuthStorageContext';

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
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, loading, refetch } = useQuery(ME);

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

  if (loading) return <View>
    <Text color="grey" fontSize="subheading" style={{ marginVertical: 10 }}>Loading...</Text>
  </View>;

  console.log(data);

  return(
    <TouchableWithoutFeedback>
      <View style={styles.navigation}>
        <ScrollView horizontal>
          <Link to="/">
            <Text color='white' style={styles.text}>Repositories</Text>
          </Link>
          {isAuthenticated ? (
            <Link to="/signout">
              <Text color='white' style={styles.text}>Sign Out</Text>
            </Link>          
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