import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { Linking } from 'react-native';
import { GET_REPOSITORY } from '../graphql/queries';
import Button from '../reusableComponents/Button';
import Text from '../reusableComponents/Text';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';
import { FlatList } from "react-native-web";
import ReviewItem from '../components/ReviewItemComponent';

const RepositoryScreen = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <View>
    <Text color="grey" fontSize="subheading" style={{ marginVertical: 10 }}>Loading...</Text>
  </View>;

  if(error) return <View>
    <Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error :</Text>
   </View>;

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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
        <Text fontWeight="bold" fontSize="subheading">Full name: {repository.fullName}</Text>
        <Button title="Open in GitHub" onPress={openRepository} />
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
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
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

export default RepositoryScreen;