import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import RepositoryItem from './RepositoryItemComponent';
import OrderMenu from './OrderMenuComponent';
import DirectionMenu from './DirectionMenuComponent';
import { Ionicons } from '@expo/vector-icons';
import Text from '../reusableComponents/Text'; 
import ReusableStyles from '../styles/ReusableStyles';
import RepositoryListStyles from '../styles/components/RepositoryListContainer';

const ItemSeparator = () => <View style={ReusableStyles.separator} />;

class RepositoryListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debouncedSearchKeyword: '',
    };
    this.debounceTimeout = null;
  }

  handleOrderChange = (newOrder) => {
    this.props.setOrderBy(newOrder);
  };

  handleDirectionChange = (newDirection) => {
    this.props.setOrderDirection(newDirection);
  };

  handleSearchChange = (text) => {
    this.props.setSearchKeyword(text);
  };

  renderHeader = () => {
    const { searchKeyword } = this.props;
    return (
      <View style={RepositoryListStyles.headerContainer}>
        <View style={[RepositoryListStyles.headerItem, { alignItems: 'center'}]}>
          <Ionicons name="search" size={20} color="gray" style={{ marginRight: 10 }} />
          <TextInput
            style={RepositoryListStyles.searcher}
            onChangeText={this.handleSearchChange}
            value={searchKeyword}
            placeholder="Search repositories..."
            accessibilityLabel="Search repositories"
            placeholderTextColor="gray"
          />
        </View>
        <View style={RepositoryListStyles.headerItem}>
          <OrderMenu setOrder={this.handleOrderChange} />
          <DirectionMenu setDirection={this.handleDirectionChange} />
        </View>
      </View>
    );
  };

  render() {
    const { repositories, isLoading, hasError } = this.props;

    if (isLoading) {
      return <View style={ReusableStyles.loadingContainer}><ActivityIndicator style={ReusableStyles.indicator} /></View>;
    }

    if (hasError) {
      return <View style={ReusableStyles.errorContainer}><Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error: {this.props.error.message}</Text></View>;
    }

    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => this.props.navigate(`/${item.id}`)}>
        <RepositoryItem repository={item} />
      </TouchableOpacity>
    );

    const repositoryNodes = repositories?.edges.map(edge => edge.node) || [];

    return (
      <PaperProvider>
        <View style={{ flex: 1 }}>
          <FlatList
            data={repositoryNodes}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={this.renderHeader}
            initialNumToRender={10}
          />
        </View>
      </PaperProvider>
    );
  }
}

export default RepositoryListContainer;