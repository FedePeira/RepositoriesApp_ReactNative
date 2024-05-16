import { StyleSheet } from 'react-native';
import theme from '../../theme';

const ReviewListStyles  = StyleSheet.create({
  listContainer: {
    backgroundColor: theme.colors.white, 
    flex: 1
  },
  listHeader: {
    paddingTop: 50, 
    paddingHorizontal: 20
  }
});

export default ReviewListStyles;
