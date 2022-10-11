import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from 'store/authContext';
const Auth = ({ children }) => {
  const { isAuth, onGetCharacter } =
    useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    onGetCharacter();
  }, [onGetCharacter]);

  if (!isAuth) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default Auth;
