import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from 'store/authContext';

const RequireCharacter = ({ children, isLoading }) => {
  const { character } = useContext(AuthContext);
  const location = useLocation();
  if (!isLoading && !character) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }

  if (!isLoading) {
    return children;
  }
};

export default RequireCharacter;
