import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from '../reusableComponents/Text';

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count;
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
      <Text fontWeight="bold" fontSize="subheading">Full name: {repository.fullName}</Text>
      <Text fontWeight="bold" fontSize="subheading">Description: {repository.description}</Text>
      <View style={styles.languageContainer}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.language} numberOfLines={1} ellipsizeMode="tail">{repository.language}</Text>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.flexItem}>
          <Text fontWeight="bold" fontSize="subheading">Stars:</Text>
          <Text align="center" fontWeight="bold" fontSize="subheading">{formatCount(repository.stargazersCount)}</Text>
        </View>
        <View style={styles.flexItem}>
          <Text align fontWeight="bold" fontSize="subheading">Forks:</Text>
          <Text align="center" fontWeight="bold" fontSize="subheading">{formatCount(repository.forksCount)}</Text>
        </View>
        <View style={styles.flexItem}>
          <Text fontWeight="bold" fontSize="subheading">Reviews:</Text>
          <Text align="center" fontWeight="bold" fontSize="subheading">{repository.reviewCount}</Text>
        </View>
        <View style={styles.flexItem}>
          <Text fontWeight="bold" fontSize="subheading">Rating:</Text>
          <Text align="center" fontWeight="bold" fontSize="subheading">{repository.ratingAverage}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  languageContainer: {
    backgroundColor: '#0366d6',
    borderRadius: 5, 
    paddingHorizontal: 5, 
    margin: 5, 
  },
  language: {
    backgroundColor: '#0366d6',
    color: 'white',
    margin: 5, 
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  flexItem: {
    flexDirection: 'column',
    margin: 20
  },
});

export default RepositoryItem;