import { useContext, useEffect } from 'react';
import AuthContext from 'store/authContext';

const Auth = ({ children }) => {
  const { character, onLogin, onGetCharacter } =
    useContext(AuthContext);

  useEffect(() => {
    onLogin();
    onGetCharacter();
  }, [onGetCharacter, onLogin]);

  if (character) {
    return children;
  }
};

export default Auth;
