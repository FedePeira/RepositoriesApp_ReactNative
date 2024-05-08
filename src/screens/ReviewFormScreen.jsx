import * as Yup from 'yup';
import React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { TextInput, Button, View, Text } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';

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
  const navigate = useNavigate();
  const [createReview, { loading }] = useMutation(CREATE_REVIEW);

 const handleSubmit = async (values) => {
    try {
      const { data } = await createReview({ variables: values });
      navigate(`/${data.createReview.repositoryId}`);
    } catch (error) {
      console.error('Error creating review:', error);
    }
 };

 return (
    <Formik
      initialValues={{ ownerUsername: '', repositoryName: '', rating: '', review: '' }}
      validationSchema={reviewValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <TextInput
            onChangeText={handleChange('ownerUsername')}
            onBlur={handleBlur('ownerUsername')}
            value={values.ownerUsername}
            placeholder="Nombre de usuario del propietario"
          />
          {errors.ownerUsername && touched.ownerUsername && <Text>{errors.ownerUsername}</Text>}

          <TextInput
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
            placeholder="Nombre del repositorio"
          />
          {errors.repositoryName && touched.repositoryName && <Text>{errors.repositoryName}</Text>}

          <TextInput
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            placeholder="Calificación"
            keyboardType="numeric"
          />
          {errors.rating && touched.rating && <Text>{errors.rating}</Text>}

          <TextInput
            onChangeText={handleChange('review')}
            onBlur={handleBlur('review')}
            value={values.review}
            placeholder="Revisión"
            multiline
            numberOfLines={4}
          />
          {errors.review && touched.review && <Text>{errors.review}</Text>}

          <Button onPress={handleSubmit} title="Enviar" disabled={loading} />
        </View>
      )}
    </Formik>
 );
};

export default ReviewFormScreen;