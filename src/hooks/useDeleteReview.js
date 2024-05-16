import { useMutation, useApolloClient } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutation';
import { Alert } from 'react-native';

const useDeleteReview = () => {
  const [deleteReview, { data, loading, error }] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient(); 

  const deleteReviewMutation = async ({ id }) => {
    console.log(id)
    console.log('Borrando la review...');
    try {
      Alert.alert(
        'Confirm',
        'Are you sure you want to log out?',
        [
            {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
            },
            {
            text: 'OK',
            onPress: async () => {
                console.log('Se borro la review');
                await deleteReview({ variables: { reviewId }});
                await apolloClient.resetStore();
                Alert.alert(
                    'Delete of the review successful',
                    'You have deleted the review correctly.',
                    [ 
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { type: 'plain-text', cancelable: false }
                  );
              },
            },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error al crear una review:", error);
      Alert.alert(
        'Error when trying to delete the review',
        'Please retry later.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { type: 'plain-text', cancelable: false }
      );
    }
  };

  return [deleteReviewMutation, { loading, error }];
};

export default useDeleteReview;