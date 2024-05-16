import { StyleSheet } from 'react-native';
import theme from '../../theme';

const RepositoryItemStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  languageContainer: {
    backgroundColor: '#0366d6',
    borderRadius: 5, 
    paddingHorizontal: 5, 
    margin: 5, 
  },
  language: {
    backgroundColor: '#0366d6',
    color: 'white',
    margin: 5, 
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  flexItem: {
    flexDirection: 'column',
    margin: 20
  },
});

export default RepositoryItemStyles;
