import Login from 'components/Login/Login';
import Register from 'components/Register/Register';
import Button from 'modules/Button';
import Card from 'modules/Card';

const LoginPage = () => {
  return (
    <div className='h-screen bg-hero bg-cover bg-bottom bg-no-repeat pt-6'>
      <div className='container mx-auto flex h-full w-3/4 flex-col justify-around'>
        <h1 className='mb-6 text-center text-8xl text-white'>
          FOREST
        </h1>
        <Card gap={16}>
          <div className='flex-[0.8]'>
            <Login />
          </div>
          <div className='flex flex-[0.2] flex-col gap-3'>
            <Register />
            <Button width='full'>作者的話</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
