import { StyleSheet } from 'react-native';

const RepositoryListStyles  = StyleSheet.create({
  searcher: {
    height: 40,
    borderColor: 'gray', 
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 5, 
    paddingLeft: 10, 
    backgroundColor: '#fff'
  },
  headerContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  headerItem: {
    paddingTop: 10, 
    flexDirection: 'row', 
    justifyContent: 'center'
  }
});

export default RepositoryListStyles;
