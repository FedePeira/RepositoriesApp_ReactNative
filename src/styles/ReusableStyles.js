import { StyleSheet } from 'react-native';

const ReusableStyles  = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    size: "large",
     color: "#0000ff"
  },
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

export default ReusableStyles;
