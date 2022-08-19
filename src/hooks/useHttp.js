import { useCallback, useReducer } from 'react';

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('HTTP STATE 錯誤');
  }
};

const getToken = (format) =>
  `${format} ${localStorage.getItem('authorization')}`;

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(
    httpReducer,
    initialState,
  );

  const clear = useCallback(
    () => dispatchHttp({ type: 'CLEAR' }),
    [],
  );

  const sendRequest = useCallback(
    ({
      url,
      method,
      useToken = false,
      body,
      reqExtra,
      reqIdentifier,
    }) => {
      const headers = new Headers({
        'Content-Type': 'application/json',
      });

      if (useToken) {
        headers.append('authorization', getToken('Bearer'));
      }

      dispatchHttp({
        type: 'SEND',
        identifier: reqIdentifier,
      });
      return fetch(url, {
        method: method,
        body: body,
        headers,
      })
        .then(async (response) => {
          const isJson = response.headers
            .get('Content-Type')
            .includes('json');
          const data = isJson
            ? await response.json()
            : await response.text();
          if (!response.ok) {
            const error = new Error(data?.message ?? data);
            error.code = response.status;
            throw error;
          }
          return data;
        })
        .then((responseData) => {
          dispatchHttp({
            type: 'RESPONSE',
            responseData: responseData,
            extra: reqExtra,
          });
          return responseData;
        })
        .catch((error) => {
          dispatchHttp({
            type: 'ERROR',
            errorMessage: error.message,
          });
          throw error;
        });
    },
    [],
  );

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    clear,
  };
};

export default useHttp;
