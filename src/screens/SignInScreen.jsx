import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import Button from '../reusableComponents/Button';
import Text from '../reusableComponents/Text';
import theme from '../theme';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../reusableComponents/Input';

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
  return (
      <Formik 
      initialValues={{
        name: '',
        password: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={values => {
        console.log(values);
      }}
      >
        {({values, errors, touched, handleChange}) =>(
        <ScrollView>
          <SafeAreaView style={{backgroundColor: theme.colors.white, flex: 1}}>
            <View style={{paddingTop: 50, paddingHorizontal: 20}}>
              {/* Titulo de Login */}
              <Text color="primary" fontSize="title" fontWeight="bold">
                Sign In
              </Text>
              <Text color="grey" fontSize="subheading" style={{ marginVertical: 10 }}>
                Enter Your Details to Login
              </Text>

              {/* Text Input */}
              <View style={{marginVertical: 20}}>
                <Input 
                  label="Name"
                  placeholder="Enter your name"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  iconName="email-outline"
                  error={errors.name}
                  touched={touched.name}
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

                <Button title="Log In"/>
                {/* Register */}
                <Text> Dont have account? Register </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>

        )}
      </Formik>
  );
};

export default SignInScreen;