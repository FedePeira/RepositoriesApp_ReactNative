import { StyleSheet } from 'react-native';
import theme from '../../theme';

const RepositoryStyles  = StyleSheet.create({
   container: {
    backgroundColor: theme.colors.white,
    padding: 10,
    marginVertical: 5,
    flexWrap: 'wrap'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default RepositoryStyles;
