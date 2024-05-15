import React, { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import useLoadingAndError from '../hooks/useLoadingAndError';
import { useDebounce } from 'use-debounce';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const { repositories, loading, error } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    debouncedSearchKeyword
  });
  const { isLoading, hasError } = useLoadingAndError(loading, error);

  return (
    <RepositoryListContainer
      navigate={navigate} 
      repositories={repositories} 
      isLoading={isLoading}
      hasError={hasError}
      error={error}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;