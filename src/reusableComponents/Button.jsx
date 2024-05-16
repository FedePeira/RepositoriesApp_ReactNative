import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import ButtonStyles from '../styles/reusableComponents/Button';


const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={ButtonStyles.button}>
      <Text style={ButtonStyles.buttonText} >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;