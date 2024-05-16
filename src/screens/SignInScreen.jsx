import React from 'react';
import {View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Button from '../reusableComponents/Button';
import Text from '../reusableComponents/Text';
import theme from '../theme';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../reusableComponents/Input';
import useSignIn from '../hooks/useSignIn';
import useLoadingAndError from '../hooks/useLoadingAndError';
import { useNavigate } from 'react-router-native';
import ReusableStyles from '../styles/ReusableStyles';
import SignInStyles from '../styles/screens/SignInScreen';

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Please enter a uniqued name.'),
  password: Yup.string()
    .min(8)
    .required('Please enter your password')
});

const SignInScreen = () => {
  const [ onSignIn, { loading, error } ] = useSignIn();
  const { isLoading, hasError } = useLoadingAndError(loading, error);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await onSignIn({ username, password });
    } catch (e) {
      console.error('Error al iniciar sesión: ', e);
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
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={values => {
        console.log(values);
      }}
      >
        {({values, errors, touched, handleChange}) =>(
        <ScrollView>
          <SafeAreaView style={SignInStyles.signContainer}>
            <View style={SignInStyles.signHeader}>
              <Text color="primary" fontSize="title" fontWeight="bold">
                Sign In
              </Text>
              <Text color="grey" fontSize="subheading" style={{ marginVertical: 10 }}>
                Enter Your Details to Login
              </Text>

              <View style={{marginVertical: 20}}>
                <Input 
                  label="Username"
                  placeholder="Enter your username"
                  onChangeText={handleChange('username')}
                  value={values.username}
                  iconName="email-outline"
                  error={errors.username}
                  touched={touched.username}
                />
                <Input 
                  label="Password"
                  placeholder="Enter your password"
                  onChangeText={handleChange('password')}
                  value={values.password}
                  iconName="lock-outline"
                  error={errors.password}
                  touched={touched.password}
                  password
                />

                <Button title="Log In" onPress={() => onSubmit(values)}/>
                <Text> Dont have account? 
                  <TouchableOpacity onPress={() => navigate('/register')}>
                    <Text color="blue">Register</Text>
                  </TouchableOpacity> 
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>

        )}
      </Formik>
  );
};

export default SignInScreen;