import useHttp from 'hooks/useHttp';
import { useCallback } from 'react';

const useGetInventoryApi = () => {
  const { data, sendRequest } = useHttp();
  const getInventoryApi = useCallback(
    (type) =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/inventory?type=${type}`,
        method: 'GET',
        useToken: true,
      }).catch(() => {}),
    [sendRequest],
  );
  return { data, getInventoryApi };
};

export { useGetInventoryApi };
