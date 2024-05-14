import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  console.log('Order: ', orderBy);
  console.log('Order direction: ', orderDirection);
  console.log('Search keyword: ', searchKeyword);

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { searchKeyword, orderBy, orderDirection },
  }); 

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