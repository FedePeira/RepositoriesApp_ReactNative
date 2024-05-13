import { useState, useEffect } from 'react';

const useLoadingAndError = (loading, error) => {
  const [isLoading, setIsLoading] = useState(loading);
  const [hasError, setHasError] = useState(error);

  useEffect(() => {
    setIsLoading(loading);
    setHasError(error);
  }, [loading, error]);

  return { isLoading, hasError };
};

export default useLoadingAndError;