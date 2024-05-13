import React from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useRegister from '../hooks/useRegister';
import useLoadingAndError from '../hooks/useLoadingAndError';
import Text from '../reusableComponents/Text';
import Input from '../reusableComponents/Input';
import theme from '../theme';
import Button from '../reusableComponents/Button';

const styles = StyleSheet.create({
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
});

const registerValidationSchema = Yup.object().shape({
  username: Yup.string()
   .required('Username is required')
   .min(1, 'Username must be at least 1 character')
   .max(30, 'Username cannot be more than 30 characters'),
  password: Yup.string()
   .required('Password is required')
   .min(5, 'Password must be at least 5 characters')
   .max(50, 'Password cannot be more than 50 characters'),
  confirmPassword: Yup.string()
   .oneOf([Yup.ref('password'), null], 'Passwords do not match')
   .required('Password confirmation is mandatory'),
});

const RegisterFormScreen = () => {
  const [createUser, { data, loading, error }] = useRegister();
  const { isLoading, hasError } = useLoadingAndError(loading, error);
  
  const handleSubmit = async (values) => {
    const {username, password } = values;
    try {
      await createUser({ username, password });
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.errorContainer}>
        <Text color="red" fontSize="subheading" style={{ marginVertical: 10 }}>Error: {error.message}</Text>
      </View>
    );
  }

return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <ScrollView>
          <SafeAreaView style={{backgroundColor: theme.colors.white, flex: 1}}>
            <View style={{paddingTop: 50, paddingHorizontal: 20}}>
              <Text color="primary" fontSize="title" fontWeight="bold">
                Register
              </Text>
              <Text color="grey" fontSize="subheading" style={{ marginVertical: 10 }}>
                Enter Your Details to register a new user
              </Text>

              <View style={{marginVertical: 20}}>
                <Input
                    label="Username"
                    placeholder="Enter your username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    iconName="account"
                    error={errors.username}
                    touched={touched.username}
                />
                <Input
                    label="Password"
                    placeholder="Enter your password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    iconName="account"
                    error={errors.password}
                    touched={touched.password}
                    password
                />
                <Input
                    label="Confirm Password"
                    placeholder="Enter your password again"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    iconName="account"
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    password
                />
                <Button onPress={() => handleSubmit(values)} title="Register" />
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </Formik>
  );
};

export default RegisterFormScreen;