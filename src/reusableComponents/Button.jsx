import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../theme';
import Text from './Text';
import ButtonStyles from '../styles/reusableComponents/Button';


const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={ButtonStyles.button}>
      <Text color="white" fontWeight="bold" fontSize="body">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;