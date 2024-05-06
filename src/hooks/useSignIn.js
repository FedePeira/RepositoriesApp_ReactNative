import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutation';
import { useContext } from 'react';
import AuthStorageContext from '../context/AuthStorageContext';


const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [signIn, { data, loading, error }] = useMutation(AUTHENTICATE);

  const onSignIn = async (username, password) => {
    try {
      const { data } = await signIn({ variables: { username, password } });
      console.log(data);
    } catch (error) {
      console.error("Error al autenticar:", error);
    }
  };

  return [onSignIn, { data, loading, error }];
};

export default useSignIn;