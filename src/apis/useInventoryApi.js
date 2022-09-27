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

const useGetGashaponApi = () => {
  const { data, error, sendRequest, clear } = useHttp();
  const getGashaponApi = useCallback(
    () =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/inventory/gashapon`,
        method: 'GET',
        useToken: true,
      }).catch(() => {}),
    [sendRequest],
  );
  return { data, error, clear, getGashaponApi };
};

export { useGetInventoryApi, useGetGashaponApi };
