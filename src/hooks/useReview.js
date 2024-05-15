import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutation';
import { useNavigate } from 'react-router-native';
import { Alert } from 'react-native';

const useReview = () => {
  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient(); 
  const navigate = useNavigate();

  const createReviewMutation = async ({ ownerName, repositoryName, rating, review }) => {
    console.log(ownerName, repositoryName, rating, review)
    console.log('Creando la review...');
    try {
      const { data } = await createReview({ variables: { ownerName, repositoryName, rating, text: review }});
      await apolloClient.resetStore();
      navigate('/');
      Alert.alert(
        'Creation of the successful review',
        'You have created the review correctly.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { type: 'plain-text', cancelable: false }
      );
    } catch (error) {
      console.error("Error al crear una review:", error);
      Alert.alert(
        'Error when trying to create a review',
        'Please check the form.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { type: 'plain-text', cancelable: false }
      );
    }
  };

  return [createReviewMutation, { data, loading, error }];
};

export default useReview;