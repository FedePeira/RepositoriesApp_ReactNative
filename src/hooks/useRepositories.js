import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection) => {
  console.log('Order: ', orderBy);
  console.log('Order direction: ', orderDirection);

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
  }); 
  console.log('Data: ', data)

  if(error) {
    console.log('Error: ', error)
  }

  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

 return { repositories, loading, error };
};

export default useRepositories;