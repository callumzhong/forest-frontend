import useHttp from 'hooks/useHttp';
import { useCallback, useContext } from 'react';
import MessageContext from 'store/messageContext';
import * as yup from 'yup';

const createCharacterSchema = yup
  .object({
    name: yup.string().max(8).required('必填'),
  })
  .required();

const useGetCharacterApi = () => {
  const { isLoading, data, error, sendRequest, clear } =
    useHttp();

  const getCharacterApi = useCallback(
    () =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/character`,
        method: 'GET',
        useToken: true,
      }).catch(() => {}),
    [sendRequest],
  );

  return {
    isLoading,
    error,
    data,
    getCharacterApi,
    clear,
  };
};

const useCreateCharacterApi = () => {
  const { isLoading, data, error, sendRequest } = useHttp();
  const { onAdd } = useContext(MessageContext);

  const createCharacterApi = useCallback(
    (body) => {
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/character`,
        method: 'POST',
        body: JSON.stringify(body),
        useToken: true,
      }).catch((error) => {
        onAdd('error', error.message, 1200);
      });
    },
    [sendRequest, onAdd],
  );

  return {
    isLoading,
    error,
    data,
    createCharacterApi,
  };
};

export {
  useGetCharacterApi,
  useCreateCharacterApi,
  createCharacterSchema,
};
