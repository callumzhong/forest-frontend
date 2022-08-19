import Button from 'modules/Button';
import Input from 'modules/Input';

const RegisterForm = () => {
  return (
    <form action='' className='mb-6 text-right'>
      <Input label='帳號' type='text' basis={8} />
      <Input
        maxLength={12}
        label='密碼'
        type='password'
        basis={8}
      />
      <Input
        maxLength={12}
        label='確定密碼'
        type='password'
        basis={8}
      />
      <Input label='信箱' type='text' basis={8} />
      <Button disabled type='submit'>
        提交
      </Button>
    </form>
  );
};

export default RegisterForm;
