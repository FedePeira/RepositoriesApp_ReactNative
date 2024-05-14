import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Text, PaperProvider, Menu, Button } from 'react-native-paper';
import RepositoryItem from './RepositoryItemComponent';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import useLoadingAndError from '../hooks/useLoadingAndError';
import { useDebounce } from 'use-debounce';

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
  menu: {
    backgroundColor: 'rgba(128, 128, 128, 0.8)', 
    borderRadius: 10,
    padding: 10, 
    width: '60%', 
    alignSelf: 'center', 
    marginTop: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { isLoading, hasError } = useLoadingAndError(loading, error);
  const navigate = useNavigate();
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [visibleDirection, setVisibleDirection] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const openMenuOrder = () => setVisibleOrder(true);
  const closeMenuOrder = () => setVisibleOrder(false);
  const openMenuDirection = () => setVisibleDirection(true);
  const closeMenuDirection = () => setVisibleDirection(false);

  const navigateToRepository = (id) => {
    navigate(`/${id}`);
  };

  const handleOrderChange = (newOrder) => {
    console.log(newOrder);
    setOrderBy(newOrder);
    setVisibleOrder(false);
  };

  const handleDirectionChange = (newDirection) => {
    console.log(newDirection);
    setOrderDirection(newDirection);
    setVisibleDirection(false);
  };

  const { repositories, loading, error } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);

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
    <PaperProvider>
      <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', alignSelf: 'center' }}
          onChangeText={setSearchKeyword}
          value={searchKeyword}
          placeholder="Search repositories..."
        />
      </View>
      <View style={{
          paddingTop: 10,
          flexDirection: 'row',   
          justifyContent: 'center',
        }}>
        <Menu
          visible={visibleOrder}
          onDismiss={closeMenuOrder}
          style={styles.menu}
          anchor={<Button onPress={openMenuOrder}>Show order</Button>}>
          <Menu.Item onPress={() => handleOrderChange('CREATED_AT')} title="Last repositories" />
          <Menu.Item onPress={() => handleOrderChange('RATING_AVERAGE')} title="Highest rated" />
          <Menu.Item onPress={() => handleOrderChange('RATING_AVERAGE')} title="Lowest rated" />
        </Menu>
        <Menu
          visible={visibleDirection}
          onDismiss={closeMenuDirection}
          style={styles.menu}
          anchor={<Button onPress={openMenuDirection}>Show order direction</Button>}>
          <Menu.Item onPress={() => handleDirectionChange('ASC')} title="Ascending" />
          <Menu.Item onPress={() => handleDirectionChange('DESC')} title="Descending" />
        </Menu>
      </View>
      <FlatList
          data={repositoryNodes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
        />
    </PaperProvider>
  );
};

export default RepositoryList;