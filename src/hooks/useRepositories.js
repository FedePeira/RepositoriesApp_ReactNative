import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ first, orderBy, orderDirection, searchKeyword }) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { first, searchKeyword, orderBy, orderDirection },
  }); 

  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if (data && data.repositories) {
      setRepositories(data.repositories);
    } else {
      console.error("Data or data.repositories is undefined");
    }
  }, [data]);

  if(error) {
    console.log('Error: ', error)
  }

  /*
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first, 
        searchKeyword, 
        orderBy, 
        orderDirection,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };
  */

 return { repositories, loading, error };
};

export default useRepositories;