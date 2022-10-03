import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'store/authContext';
const Auth = ({ children }) => {
  const { isAuth, onLogin, character, onGetCharacter } =
    useContext(AuthContext);
  const navigate = useNavigate();

  //TODO: 待更版驗證為自動延長 token
  useEffect(() => {
    if (isAuth) return;
    const fetchData = async () => {
      await onLogin();
      await onGetCharacter();
    };

    fetchData().catch((err) => {
      navigate('/login');
    });
  }, [
    navigate,
    isAuth,
    onLogin,
    onGetCharacter,
    character,
  ]);

  return character && isAuth && children;
};

export default Auth;
