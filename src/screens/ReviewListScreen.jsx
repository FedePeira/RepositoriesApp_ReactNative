import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import useLoadingAndError from '../hooks/useLoadingAndError';
import Text from '../reusableComponents/Text';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../graphql/queries';
import theme from '../theme';
import ReviewItem from '../components/ReviewItemComponent';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
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
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewsListScreen = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const { isLoading, hasError } = useLoadingAndError(loading, error);

  if (isLoading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (hasError) {
    return <View style={styles.errorContainer}><Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error: {error.message}</Text></View>;
  };

  const reviews = data.me.reviews.edges.map((edge) => edge.node);

  const renderItem = ({ item }) => (
    <View style={{ width: '100%', height: 'auto' }}>
      <ReviewItem review={item} />
    </View>
  );

  return (
    <ScrollView>
      <SafeAreaView style={{backgroundColor: theme.colors.white, flex: 1}}>
        <View style={{paddingTop: 50, paddingHorizontal: 20}}>
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