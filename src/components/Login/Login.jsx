import useLoginApi, { schema } from 'apis/useLoginApi';
import LoginForm from './LoginForm';

const Login = ({ onEnableAuthenticate }) => {
  const { isLoading, loginApi } = useLoginApi({
    onEnableAuthenticate,
  });

  return (
    <LoginForm
      schema={schema}
      onSubmit={loginApi}
      isLoading={isLoading}
    />
  );
};

export default Login;
