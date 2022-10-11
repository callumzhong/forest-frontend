import useHttp from 'hooks/useHttp';
import { useCallback, useContext, useEffect } from 'react';
import MessageContext from 'store/messageContext';

const useGetInventoryApi = ({ type }) => {
  const { data, sendRequest } = useHttp();
  const getInventoryApi = useCallback(
    () =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/inventory?type=${type}`,
        method: 'GET',
        useToken: true,
      }),
    [sendRequest, type],
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
      }),
    [sendRequest],
  );
  return { data, error, clear, getGashaponApi };
};

const usePostPropApi = () => {
  const { sendRequest, data, error } = useHttp();
  const { onAdd } = useContext(MessageContext);
  const postPropApi = useCallback(
    (id) =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/inventory/use_prop`,
        method: 'POST',
        body: JSON.stringify({
          propId: id,
        }),
        useToken: true,
      }),
    [sendRequest],
  );

  useEffect(() => {
    if (data) {
      onAdd('info', data, 1200);
    }
  }, [data, onAdd]);

  useEffect(() => {
    if (error) {
      onAdd('error', error.message, 1200);
    }
  }, [error, onAdd]);

  return { postPropApi };
};

export {
  useGetInventoryApi,
  useGetGashaponApi,
  usePostPropApi,
};
