import { useGetCharacterApi } from 'apis/useCharacterApi';
import React, { useCallback, useState } from 'react';

const AuthContext = React.createContext({
  isAuth: false,
  character: {},
  onLogin: () => {},
  onLogout: () => {},
  onGetCharacter: () => {},
});

export const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const { getCharacterApi, data, clear } =
    useGetCharacterApi();
  const loginHandler = useCallback(
    (token) => {
      if (token) {
        localStorage.setItem('authorization', token);
      }

      getCharacterApi().then((val) => {
        setIsAuth(true);
      });
    },
    [getCharacterApi],
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
