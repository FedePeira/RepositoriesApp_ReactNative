import { StyleSheet } from 'react-native';
import theme from '../../theme';

const SignInStyles  = StyleSheet.create({
  signContainer: {
    backgroundColor: theme.colors.white,
    flex: 1
  },
  signHeader: {
    paddingTop: 50, 
    paddingHorizontal: 20
  },
  register: {
    color: theme.colors.blue, 
    textDecorationLine: 'underline' 
  }
});

export default SignInStyles;
