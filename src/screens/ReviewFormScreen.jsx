import * as Yup from 'yup';
import React from 'react';
import { View, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import Button  from '../reusableComponents/Button';
import useLoadingAndError from '../hooks/useLoadingAndError';
import Input from '../reusableComponents/Input';
import theme from '../theme';
import Text from '../reusableComponents/Text';
import useCreateReview from '../hooks/useCreateReview';
import ReusableStyles from '../styles/ReusableStyles';

const reviewValidationSchema = Yup.object().shape({
 ownerUsername: Yup.string()
    .required('El nombre de usuario del propietario es obligatorio'),
 repositoryName: Yup.string()
    .required('El nombre del repositorio es obligatorio'),
 rating: Yup.number()
    .required('La calificación es obligatoria')
    .min(0, 'La calificación debe estar entre 0 y 100')
    .max(100, 'La calificación debe estar entre 0 y 100'),
 review: Yup.string()
    .nullable()
    .notRequired(),
});

const ReviewFormScreen = () => {
  const [createReview, { loading, error }] = useCreateReview();
  const { isLoading, hasError } = useLoadingAndError(loading, error);

  const handleSubmit = async (values) => {
    const { ownerName, repositoryName, rating, reviewText } = values;
    try {
      await createReview({ ownerName, repositoryName, rating, reviewText });
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

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

 return (
    <Formik
      initialValues={{ ownerName: '', repositoryName: '', rating: '', reviewText: '' }}
      validationSchema={reviewValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => (
        <ScrollView>
        <SafeAreaView style={{backgroundColor: theme.colors.white, flex: 1}}>
          <View style={{paddingTop: 50, paddingHorizontal: 20}}>
            <Text color="primary" fontSize="title" fontWeight="bold">
              Create a Review
            </Text>
            <Text color="grey" fontSize="subheading" style={{ marginVertical: 10 }}>
              Enter Your Details to create a review
            </Text>

            <View style={{marginVertical: 20}}>
              <Input 
                label="ownerName"
                placeholder="Enter your owner name"
                onChangeText={handleChange('ownerName')}
                onBlur={handleBlur('ownerName')}
                value={values.ownerName}
                iconName="account"
                error={errors.ownerName}
                touched={touched.ownerName}
              />
              <Input 
                label="RepositoryName"
                placeholder="Enter your repository name"
                onChangeText={handleChange('repositoryName')}
                onBlur={handleBlur('repositoryName')}
                value={values.repositoryName}
                iconName="source-branch"
                error={errors.repositoryName}
                touched={touched.repositoryName}
              />
              <Input 
                label="Rating"
                placeholder="Enter your rating"
                onChangeText={handleChange('rating')}
                onBlur={handleBlur('rating')}
                value={values.rating}
                iconName="star"
                error={errors.rating}
                touched={touched.rating}
              />  
              <Input 
                label="Review"
                placeholder="Enter your review"
                onChangeText={handleChange('reviewText')}
                onBlur={handleBlur('reviewText')}
                value={values.reviewText}
                iconName="comment"
                error={errors.reviewText}
                touched={touched.reviewText}
              />
              <Button onPress={() => handleSubmit(values)} title="Send" disabled={loading} />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      )}
    </Formik>
 );
};

export default ReviewFormScreen;