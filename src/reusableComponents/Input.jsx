import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';
import Text from './Text';
import InputStyles from '../styles/reusableComponents/Input';

const Input = ({ label, value, iconName, error, touched, password, ...props }) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={{marginBottom: 20}}>
      <Text fontSize="body" color="grey" style={InputStyles.inputLabel}>{label}</Text>
      <View style={[ InputStyles.inputContainer, { borderColor: error ? theme.colors.red : isFocused ?  theme.colors.darkBlue :  theme.colors.light, alignItems: 'center', }, ]}>
        <Icon
          name={iconName}
          style={[InputStyles.icon,{ marginRight: 10 } ]}
        />
        <TextInput
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          value={value}
          secureTextEntry={hidePassword}
          autoCorrect={false}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={InputStyles.icon}
          />
        )}
      </View>
      {touched && error && (
        <Text color="red" style={InputStyles.textError}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;