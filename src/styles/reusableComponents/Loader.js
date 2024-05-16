import { StyleSheet } from 'react-native';
import theme from '../../theme';

const LoaderStyles  = StyleSheet.create({
    loader: {
      height: 70,
      backgroundColor: theme.colors.white,
      marginHorizontal: 50,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    container: {
      position: 'absolute',
      zIndex: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
    },
    loaderText: {
      marginLeft: 10
    },  
    indicator: {
      size: "large",
      color: theme.colors.blue
    }
});

export default LoaderStyles;