import useLoginApi, { schema } from 'apis/useLoginApi';
import LoginForm from './LoginForm';

const Login = () => {
  const { isLoading, loginApi } = useLoginApi();

  return (
    <>
      <LoginForm
        schema={schema}
        onSubmit={loginApi}
        isLoading={isLoading}
      />
    </>
  );
};

export default Login;
