import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import useLoadingAndError from '../hooks/useLoadingAndError';
import Text from '../reusableComponents/Text';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../graphql/queries';
import ReviewItem from '../components/ReviewItemComponent';
import ReusableStyles from '../styles/ReusableStyles';
import ReviewListStyles from '../styles/screens/ReviewListScreen';

const ItemSeparator = () => <View style={ReusableStyles.separator} />;

const ReviewsListScreen = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const { isLoading, hasError } = useLoadingAndError(loading, error);

  if (isLoading) {
    return <View style={ReusableStyles.loadingContainer}><ActivityIndicator style={ReusableStyles.indicator} /></View>;
  }

  if (hasError) {
    return <View style={ReusableStyles.errorContainer}><Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error: {error.message}</Text></View>;
  };

  const reviews = data.me.reviews.edges.map((edge) => edge.node);

  const renderItem = ({ item }) => (
    <View style={{ width: '100%', height: 'auto' }}>
      <ReviewItem review={item} />
    </View>
  );

  return (
    <ScrollView>
      <SafeAreaView style={ReviewListStyles.listContainer}>
        <View style={ReviewListStyles.listHeader}>
          <Text color="primary" fontSize="title" fontWeight="bold">
            List of Reviews
          </Text>
          <View style={{marginVertical: 20}}>
            <FlatList
              data={reviews}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemSeparator}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ReviewsListScreen;