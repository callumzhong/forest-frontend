import Login from 'components/Login/Login';

const LoginPage = () => {
  return (
    <div className='h-screen bg-hero bg-cover bg-bottom bg-no-repeat pt-6'>
      <div className='container mx-auto flex h-full w-3/4 flex-col justify-around'>
        <h1 className='mb-6 text-center text-8xl text-white'>
          FOREST
        </h1>

        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
