import useAuthTokenApi from 'apis/useAuthTokenApi';
import { useGetCharacterApi } from 'apis/useCharacterApi';
import React, { useCallback, useState } from 'react';

const AuthContext = React.createContext({
  isAuth: false,
  character: {},
  onLogin: async () => {},
  onLogout: () => {},
  onGetCharacter: async () => {},
});

export const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const { authTokenApi } = useAuthTokenApi();
  const { getCharacterApi, data, clear } =
    useGetCharacterApi();
  const loginHandler = useCallback(
    (_token) => {
      if (_token) {
        localStorage.setItem('authorization', _token);
      }
      return authTokenApi().then(() => {
        setIsAuth(true);
      });
    },
    [authTokenApi],
  );

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('authorization');
    clear();
    setIsAuth(false);
  }, [clear]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        character: data,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onGetCharacter: getCharacterApi,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
