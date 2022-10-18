import { useCallback, useState } from 'react';

const useAuthorization = () => {
  const [isAuth, setIsAuth] = useState();
  const enableAuthenticateHandler = useCallback((token) => {
    localStorage.setItem('authorization', token);
    setIsAuth(true);
  }, []);

  const disableAuthenticateHandler = useCallback(() => {
    localStorage.removeItem('authorization');
    setIsAuth(false);
  }, []);

  return {
    isAuth,
    enableAuthenticateHandler,
    disableAuthenticateHandler,
  };
};

export default useAuthorization;
