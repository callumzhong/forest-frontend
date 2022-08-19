import { useContext, useEffect } from 'react';
import AuthContext from 'store/authContext';
import LoginForm from './LoginForm';
import Message from './Message';

const Login = () => {
  const { onLogout } = useContext(AuthContext);
  useEffect(() => {
    onLogout();
    console.log(1);
  }, [onLogout]);

  return (
    <>
      <LoginForm />
      <Message />
    </>
  );
};

export default Login;
