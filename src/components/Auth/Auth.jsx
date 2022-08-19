import useAuthTokenApi from 'apis/useAuthTokenApi';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'store/authContext';
const Auth = ({ children }) => {
  const { isAuth, onLogin } = useContext(AuthContext);
  const { authTokenApi } = useAuthTokenApi();
  const navigate = useNavigate();
  //TODO: 待更版驗證為自動延長 token
  useEffect(() => {
    if (isAuth) return;
    authTokenApi()
      .then(() => {
        onLogin();
      })
      .catch((err) => {
        navigate('/login');
      });
  }, [authTokenApi, navigate, isAuth, onLogin]);

  return isAuth && children;
};

export default Auth;
