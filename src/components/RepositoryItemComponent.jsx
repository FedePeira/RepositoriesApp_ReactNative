import React from 'react';
import { View, Image } from 'react-native';
import Text from '../reusableComponents/Text';
import RepositoryItemStyles from '../styles/components/RepositoryItemComponent';

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count;
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={RepositoryItemStyles.container}>
      <Image source={{ uri: repository.ownerAvatarUrl }} style={RepositoryItemStyles.avatar} />
      <Text fontWeight="bold" fontSize="subheading">Full name: {repository.fullName}</Text>
      <Text fontWeight="bold" fontSize="subheading">Description: {repository.description}</Text>
      <View style={RepositoryItemStyles.languageContainer}>
        <Text fontWeight="bold" fontSize="subheading" style={RepositoryItemStyles.language} numberOfLines={1} ellipsizeMode="tail">{repository.language}</Text>
      </View>
      <View style={RepositoryItemStyles.flexContainer}>
        <View style={RepositoryItemStyles.flexItem}>
          <Text fontWeight="bold" fontSize="subheading">Stars:</Text>
          <Text align="center" fontWeight="bold" fontSize="subheading">{formatCount(repository.stargazersCount)}</Text>
        </View>
        <View style={RepositoryItemStyles.flexItem}>
          <Text align fontWeight="bold" fontSize="subheading">Forks:</Text>
          <Text align="center" fontWeight="bold" fontSize="subheading">{formatCount(repository.forksCount)}</Text>
        </View>
        <View style={RepositoryItemStyles.flexItem}>
          <Text fontWeight="bold" fontSize="subheading">Reviews:</Text>
          <Text align="center" fontWeight="bold" fontSize="subheading">{repository.reviewCount}</Text>
        </View>
        <View style={RepositoryItemStyles.flexItem}>
          <Text fontWeight="bold" fontSize="subheading">Rating:</Text>
          <Text align="center" fontWeight="bold" fontSize="subheading">{repository.ratingAverage}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;