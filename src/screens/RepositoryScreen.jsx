import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import Button from '../reusableComponents/Button';
import Text from '../reusableComponents/Text';
import { SafeAreaView, View, Image, StyleSheet, FlatList, ActivityIndicator, Linking } from 'react-native';
import ReviewItem from '../components/ReviewItemComponent';
import useLoadingAndError from '../hooks/useLoadingAndError';
import ReusableStyles from '../styles/ReusableStyles';
import RepositoryStyles from '../styles/screens/RepositoryScreen';

const ItemSeparator = () => <View style={ReusableStyles.separator} />;

const RepositoryScreen = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });
  const { isLoading, hasError } = useLoadingAndError(loading, error);

  if (isLoading) {
    return (
      <View style={ReusableStyles.loadingContainer}>
        <ActivityIndicator style={ReusableStyles.indicator} />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={ReusableStyles.errorContainer}>
        <Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error: {error.message}</Text>
      </View>
    );
  }

  const repository = data?.repository;
  if (!repository) {
    return <View>
      <Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>No se encontraron el repositorio</Text>
    </View>;
  }

  const reviews = repository?.reviews.edges.map(edge => edge.node);
  if (!reviews) {
    return <View>
      <Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>No se encontraron los reviews</Text>
    </View>;
  }

  const openRepository = () => {
    Linking.openURL(repository.url);
  };

  const renderItem = ({ item }) => (
    <View style={{ width: '100%', height: 'auto' }}>
      <ReviewItem review={item} />
    </View>
  );

  return (
    <SafeAreaView>
      <View style={RepositoryStyles.container}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={RepositoryStyles.avatar} />
        <Text fontWeight="bold" fontSize="subheading">Full name: {repository.fullName}</Text>
        <Button title="Open in GitHub" onPress={openRepository} />
          <FlatList
            data={reviews}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparator}
          />
      </View>
    </SafeAreaView>
  );
};

export default RepositoryScreen;