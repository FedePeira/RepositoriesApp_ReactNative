import React from 'react';
import { FlatList } from "react-native-web";
import { View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItemComponent';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { TouchableOpacity } from 'react-native-web';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  const navigateToRepository = (id) => {
    navigate(`/${id}`);
  };

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