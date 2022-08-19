import useHttp from 'hooks/useHttp';
import { useCallback } from 'react';

const useAuthTokenApi = () => {
  const { isLoading, data, error, sendRequest } = useHttp();
  const authTokenApi = useCallback(
    async () =>
      await sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/user/check_auth`,
        method: 'GET',
        useToken: true,
      }),
    [sendRequest],
  );

  return {
    isLoading,
    error,
    data,
    authTokenApi,
  };
};

export default useAuthTokenApi;
