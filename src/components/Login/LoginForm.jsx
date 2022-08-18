import Button from 'modules/Button';
import Input from 'modules/Input';

const LoginForm = () => {
  return (
    <form action='' className='mb-6 text-right'>
      <Input label='EMAIL' basis={8} />
      <Input label='PASSWORD' basis={8} error='123' />
      <Button type='submit'>LOGIN</Button>
    </form>
  );
};

export default LoginForm;
