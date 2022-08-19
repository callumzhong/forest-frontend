import React, { useCallback, useState } from 'react';

const AuthContext = React.createContext({
  isAuth: false,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);

  const loginHandler = useCallback((token) => {
    if (token) {
      localStorage.setItem('authorization', token);
    }
    setIsAuth(true);
  }, []);

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('authorization');
    setIsAuth(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
