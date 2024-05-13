import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import RepositoryItem from './RepositoryItemComponent';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import useLoadingAndError from '../hooks/useLoadingAndError';

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

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();
  const navigate = useNavigate();
  const { isLoading, hasError } = useLoadingAndError(loading, error);

  const navigateToRepository = (id) => {
    navigate(`/${id}`);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.errorContainer}>
        <Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToRepository(item.id)}>
      <RepositoryItem repository={item} />
    </TouchableOpacity>
  );

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
      <FlatList
        data={repositoryNodes}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
      />
  );
};

export default RepositoryList;