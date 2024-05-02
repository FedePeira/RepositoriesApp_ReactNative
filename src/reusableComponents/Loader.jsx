import React from 'react';
import {
  useWindowDimensions,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import theme from '../theme';
import Text from './Text';

const style = StyleSheet.create({
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
});

const Loader = ({visible = false}) => {
  const {width, height} = useWindowDimensions();
  
  return (
    visible && (
      <View style={[style.container, {height, width}]}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={theme.colors.blue} />
          <Text fontSize="body" style={{marginLeft: 10}}>Loading...</Text>
        </View>
      </View>
    )
  );
};

export default Loader;