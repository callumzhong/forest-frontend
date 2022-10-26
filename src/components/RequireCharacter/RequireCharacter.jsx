import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from 'store/authContext';

const RequireCharacter = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { character, onGetCharacter } =
    useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      if (!character) {
        await onGetCharacter();
      }
      setIsLoading(false);
    })();
  }, [character, onGetCharacter]);

  if (!isLoading && !character) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }

  return !isLoading && children;
};

export default RequireCharacter;
