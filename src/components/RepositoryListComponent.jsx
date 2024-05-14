import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Text, PaperProvider, Menu, Button } from 'react-native-paper';
import RepositoryItem from './RepositoryItemComponent';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import useLoadingAndError from '../hooks/useLoadingAndError';
import { useDebounce } from 'use-debounce';
import OrderMenu from './OrderMenuComponent';
import DirectionMenu from './DirectionMenuComponent';

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
  const navigate = useNavigate();

  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [searchKeyword, setSearchKeyword] = useState('');

  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, loading, error } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);
  const { isLoading, hasError } = useLoadingAndError(loading,);

  const handleOrderChange = (newOrder) => {
    setOrderBy(newOrder);
  };

  const handleDirectionChange = (newDirection) => {
    setOrderDirection(newDirection);
  };

  const renderHeader = () => (
    <>
      <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', alignSelf: 'center' }}
          onChangeText={setSearchKeyword}
          value={searchKeyword}
          placeholder="Search repositories..."
        />
      </View>
      <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
        <OrderMenu setOrder={handleOrderChange} />
        <DirectionMenu setDirection={handleDirectionChange} />
      </View>
    </>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToRepository(item.id)}>
      <RepositoryItem repository={item} />
    </TouchableOpacity>
  );

  const navigateToRepository = (id) => navigate(`/${id}`);
  const repositoryNodes = repositories?.edges.map(edge => edge.node) || [];

  if (isLoading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (hasError) {
    return <View style={styles.errorContainer}><Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error: {error.message}</Text></View>;
  }

  return (
    <PaperProvider>
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={renderHeader}
      />
    </PaperProvider>
  );
};

export default RepositoryList;