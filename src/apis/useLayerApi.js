import useHttp from 'hooks/useHttp';
import { useCallback } from 'react';

const useGetLayerApi = () => {
  const { isLoading, data, error, sendRequest } = useHttp();
  const getLayerApi = useCallback(
    (value = 'home') =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/layer?search=${value}`,
        method: 'GET',
      }),
    [sendRequest],
  );
  return { data, getLayerApi };
};

export { useGetLayerApi };
