import useHttp from 'hooks/useHttp';
import { useCallback, useContext } from 'react';
import MessageContext from 'store/messageContext';

const useGetInventoryApi = ({ type }) => {
  const { data, sendRequest } = useHttp();
  const getInventoryApi = useCallback(
    () =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/inventory?type=${type}`,
        method: 'GET',
        useToken: true,
      }).catch(() => {}),
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
      }).catch(() => {}),
    [sendRequest],
  );
  return { data, error, clear, getGashaponApi };
};

const usePostPropApi = () => {
  const { sendRequest } = useHttp();
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
      })
        .then((res) => {
          onAdd('info', res, 1200);
        })
        .catch((error) => {
          onAdd('error', error.message, 1200);
        }),
    [sendRequest, onAdd],
  );
  return { postPropApi };
};

export {
  useGetInventoryApi,
  useGetGashaponApi,
  usePostPropApi,
};
