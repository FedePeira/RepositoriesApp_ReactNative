import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../reusableComponents/Text';

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
  return(
    <TouchableWithoutFeedback>
      <View style={styles.navigation}>
        <ScrollView horizontal>
          <Link to="/">
            <Text color='white' style={styles.text}>Repositories</Text>
          </Link>
          <Link to="/signin">
            <Text color='white' style={styles.text}>Sign In</Text>
          </Link>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  ); 
};

export default AppBar;