import useHttp from 'hooks/useHttp';
import { useCallback, useContext, useEffect } from 'react';
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
      }),
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
  const { isLoading, data, error, code, sendRequest } =
    useHttp();
  const { onAdd } = useContext(MessageContext);

  const createCharacterApi = useCallback(
    (body) =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/character`,
        method: 'POST',
        body: JSON.stringify(body),
        useToken: true,
      }),
    [sendRequest],
  );

  useEffect(() => {
    if (error & (code !== 401)) {
      onAdd('error', error, 1200);
    }
  }, [error, onAdd, code]);

  return {
    isLoading,
    error,
    data,
    createCharacterApi,
  };
};

const useUpdateCharacterAttributesApi = () => {
  const { sendRequest, error, code } = useHttp();
  const { onAdd } = useContext(MessageContext);

  const updateCharacterAttributesApi = useCallback(
    (id, body) =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/character/${id}`,
        method: 'PATCH',
        body: JSON.stringify(body),
        useToken: true,
      }),
    [sendRequest],
  );

  useEffect(() => {
    if (error && code !== 401) {
      onAdd('error', error, 1200);
    }
  }, [error, onAdd, code]);

  return {
    updateCharacterAttributesApi,
  };
};

const useDeleteCharacterDeathApi = () => {
  const { sendRequest, data, code, error } = useHttp();
  const { onAdd } = useContext(MessageContext);

  const deleteCharacterDeathApi = useCallback(
    (id) =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/character/death/${id}`,
        method: 'DELETE',
        useToken: true,
      }),
    [sendRequest],
  );
  useEffect(() => {
    if (data) {
      onAdd('info', '角色餓死已被 GM 復活', 1200);
    }
  }, [data, onAdd]);

  useEffect(() => {
    if (error && code !== 401) {
      onAdd('error', error, 1200);
    }
  }, [error, onAdd, code]);

  return {
    deleteCharacterDeathApi,
  };
};

export {
  useGetCharacterApi,
  useCreateCharacterApi,
  useUpdateCharacterAttributesApi,
  createCharacterSchema,
  useDeleteCharacterDeathApi,
};
