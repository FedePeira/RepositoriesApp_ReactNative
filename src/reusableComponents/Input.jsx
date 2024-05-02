import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  inputContainer: {
    height: 55,
    backgroundColor: theme.colors.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

const Input = ({ label, value, iconName, error, touched, password, ...props }) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={{marginBottom: 20}}>
      <Text fontSize="body" color="grey" style={{marginVertical: 5}}>{label}</Text>
      <View style={[ styles.inputContainer, { borderColor: error ? theme.colors.red : isFocused ?  theme.colors.darkBlue :  theme.colors.light, alignItems: 'center', }, ]}>
        <Icon
          name={iconName}
          style={{color: theme.colors.darkBlue, fontSize: theme.fontSizes.iconSize, marginRight: 10}}
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
            style={{color: theme.colors.darkBlue, fontSize: theme.fontSizes.iconSize}}
          />
        )}
      </View>
      {touched && error && (
        <Text color="red" style={{marginTop: 10}}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;