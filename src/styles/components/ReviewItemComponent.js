import { StyleSheet } from 'react-native';

const ReviewItemStyles  = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, 
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white', 
  },
  reviewInfo: {
    flex: 1, 
  },
  buttonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginTop: 10, 
  },
});

export default ReviewItemStyles;
