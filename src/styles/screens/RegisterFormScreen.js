import { StyleSheet } from 'react-native';
import theme from '../../theme';

const RegisterFormStyles  = StyleSheet.create({
  registerContainer: {
    backgroundColor: theme.colors.white, 
    flex: 1
  },
  registerHeader: {
    paddingTop: 50, 
    paddingHorizontal: 20
  },
  registerInputs: {
    marginVertical: 20
  }
});

export default RegisterFormStyles;
