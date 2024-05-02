import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../theme';
import Text from './Text';

const style = StyleSheet.create({
  buttonStyle: {
    height: 55,
    width: '100%',
    backgroundColor: theme.colors.blue,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={style.buttonStyle}>
      <Text color="white" fontWeight="bold" fontSize="body">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;