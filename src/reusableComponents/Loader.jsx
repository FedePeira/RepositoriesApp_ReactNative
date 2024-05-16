import React from 'react';
import {
  useWindowDimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import Text from './Text';
import LoaderStyles from '../styles/reusableComponents/Loader';

const Loader = ({visible = false}) => {
  const {width, height} = useWindowDimensions();
  
  return (
    visible && (
      <View style={[LoaderStyles.container, {height, width}]}>
        <View style={LoaderStyles.loader}>
          <ActivityIndicator style={LoaderStyles.indicator} />
          <Text fontSize="body" style={LoaderStyles.loaderText}>Loading...</Text>
        </View>
      </View>
    )
  );
};

export default Loader;