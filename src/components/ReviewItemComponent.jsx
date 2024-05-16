import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { format } from 'date-fns';
import useDeleteReview from '../hooks/useDeleteReview';
import { useNavigate } from 'react-router-native';
import useLoadingAndError from '../hooks/useLoadingAndError';
import ReusableStyles from '../styles/ReusableStyles';
import ReviewItemStyles from '../styles/components/ReviewItemComponent';

const ReviewItem = ({ review }) => {
  const [deleteReview, { loading, error }] = useDeleteReview();
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
  const { isLoading, hasError } = useLoadingAndError(loading, error);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    const id = review.id;
    try {
      await deleteReview({ id });
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleView = async () => {
    console.log('Enviando al usuario a la vista del repositorio');
    const id = review.repositoryId;
    navigate(`/${id}`); 
  };

  return (
    <SafeAreaView>
        <View style={ReviewItemStyles.container}>
            <View style={ReviewItemStyles.ratingContainer}>
                <Text style={ReviewItemStyles.ratingText}>{review.rating}</Text>
            </View>
            <View style={ReviewItemStyles.reviewInfo}>
                <Text>{review.user.username}</Text>
                <Text>{formattedDate}</Text>
                <Text>{review.text}</Text>
                <View style={ReviewItemStyles.buttonsContainer}>
                  <Button 
                    onPress={() => handleDelete()} 
                    title="Delete review" 
                    disabled={loading} 
                  />
                  <Button 
                    onPress={() => handleView()} 
                    title="View repository" 
                    disabled={loading}
                  />
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
};

export default ReviewItem;