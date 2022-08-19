import Author from 'components/Author/Author';
import Login from 'components/Login/Login';
import Register from 'components/Register/Register';
import Card from 'modules/Card';
import Hero from 'modules/Hero';

const LoginPage = () => {
  return (
    <Hero className={'h-screen py-6'}>
      <div className='container mx-auto flex h-full w-3/5 flex-col justify-around'>
        <h1 className='mb-6 text-center text-8xl text-white'>
          FOREST
        </h1>
        <Card gap={16}>
          <div className='flex-[0.8]'>
            <Login />
          </div>
          <div className='flex flex-[0.2] flex-col gap-3'>
            <Register />
            <Author />
          </div>
        </Card>
      </div>
    </Hero>
  );
};

export default LoginPage;
