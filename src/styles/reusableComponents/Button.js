import { StyleSheet } from 'react-native';
import theme from '../../theme';

const ButtonStyles  = StyleSheet.create({
  button: {
    height: 55,
    width: '100%',
    backgroundColor: theme.colors.blue,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: '#007AFF', 
    borderColor: '#0056b3', 
    borderWidth: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5, 
  },
});

export default ButtonStyles;
