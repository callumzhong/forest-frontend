import { useCallback, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  loading: false,
  error: null,
  code: null,
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
      return {
        loading: false,
        code: action.errorCode,
        error: action.errorMessage,
      };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('HTTP STATE 錯誤');
  }
};

const getToken = (format) =>
  `${format} ${localStorage.getItem('authorization')}`;

const useHttp = () => {
  const navigate = useNavigate();
  const [httpState, dispatchHttp] = useReducer(
    httpReducer,
    initialState,
  );

  const clear = useCallback(
    () => dispatchHttp({ type: 'CLEAR' }),
    [],
  );

  const sendRequest = useCallback(
    async ({
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

      try {
        const response = await fetch(url, {
          method: method,
          body: body,
          headers,
        });
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
        const responseData = await data;
        dispatchHttp({
          type: 'RESPONSE',
          responseData: responseData,
          extra: reqExtra,
        });
        return responseData;
      } catch (error) {
        dispatchHttp({
          type: 'ERROR',
          errorCode: error.code,
          errorMessage: error.message,
        });
      }
    },
    [],
  );
  const { error, code } = httpState;
  useEffect(() => {
    if (error && code === 401) {
      navigate('/login');
    }
  }, [error, code, navigate]);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    code: httpState.code,
    error: httpState.error,
    sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    clear,
  };
};

export default useHttp;
