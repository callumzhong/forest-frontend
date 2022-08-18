import Button from 'modules/Button';
import Card from 'modules/Card';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <Card gap={16}>
      <div className='flex-[0.8]'>
        <LoginForm />
        <div className='border-2 border-amber-600 p-6'>
          Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Fugit in quas quibusdam impedit aliquid ea
          deserunt ducimus non. Unde et perspiciatis atque
          ratione quidem optio facilis perferendis, delectus
          officia minus?
        </div>
      </div>
      <div className='flex flex-[0.2] flex-col gap-3'>
        <Button width='full'>註冊</Button>
        <Button width='full'>說明</Button>
      </div>
    </Card>
  );
};

export default Login;
