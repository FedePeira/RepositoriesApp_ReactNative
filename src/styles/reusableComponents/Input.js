import { StyleSheet } from 'react-native';
import theme from '../../theme';

const InputStyles = StyleSheet.create({
  inputContainer: {
    height: 55,
    backgroundColor: theme.colors.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
  inputLabel: {
    marginVertical: 5
  },
  icon: {
    color: theme.colors.darkBlue,
    fontSize: theme.fontSizes.iconSize, 
    marginRight: 10
  },
  textError: {
    marginTop: 10
  }
});

export default InputStyles;
