import Button from 'modules/Button';
import Input from 'modules/Input';

const LoginForm = () => {
  return (
    <form action='' className='mb-6 text-right'>
      <Input label='帳號' basis={8} />
      <Input label='密碼' type='password' basis={8} />
      <Button disabled type='submit'>
        LOGIN
      </Button>
    </form>
  );
};

export default LoginForm;
