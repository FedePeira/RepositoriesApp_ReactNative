import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import RepositoryItem from './RepositoryItemComponent';
import OrderMenu from './OrderMenuComponent';
import DirectionMenu from './DirectionMenuComponent';
import { Ionicons } from '@expo/vector-icons';
import Text from '../reusableComponents/Text'; 

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
  searcher: {
    height: 40,
    borderColor: 'gray', 
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 5, 
    paddingLeft: 10, 
    backgroundColor: '#fff'
  },
  headerContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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
      <View style={styles.headerContainer}>
        <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'center' , alignItems: 'center'}}>
          <Ionicons name="search" size={20} color="gray" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.searcher}
            onChangeText={this.handleSearchChange}
            value={searchKeyword}
            placeholder="Search repositories..."
            accessibilityLabel="Search repositories"
            placeholderTextColor="gray"
          />
        </View>
        <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
          <OrderMenu setOrder={this.handleOrderChange} />
          <DirectionMenu setDirection={this.handleDirectionChange} />
        </View>
      </View>
    );
  };

  render() {
    const { repositories, isLoading, hasError } = this.props;

    if (isLoading) {
      return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;
    }

    if (hasError) {
      return <View style={styles.errorContainer}><Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error: {this.props.error.message}</Text></View>;
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