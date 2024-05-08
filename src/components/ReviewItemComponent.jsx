// En src/components/ReviewItem.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { SafeAreaView } from 'react-native-web';

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
  console.log(review);
  return (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.reviewInfo}>
                <Text>{review.user.username}</Text>
                <Text>{formattedDate}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
 },
 ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, 
 },
 ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white', 
 },
 reviewInfo: {
    flex: 1, 
 },
});

export default ReviewItem;