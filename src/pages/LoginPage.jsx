import Author from 'components/Author/Author';
import Character from 'components/Character/Character';
import Login from 'components/Login/Login';
import Message from 'components/Login/Message';
import Register from 'components/Register/Register';
import Card from 'modules/Card';
import Hero from 'modules/Hero';
import { useContext, useEffect } from 'react';
import AuthContext from 'store/authContext';
import sleep from 'utils/sleep';

const LoginPage = ({ onSceneTransition }) => {
  const { onLogout, isAuth, character } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await sleep(1000);
      onSceneTransition(false);
    };
    fetchData();
  }, [onSceneTransition]);

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return (
    <Hero className={'h-screen py-6'}>
      <div className='container mx-auto flex h-full w-3/5 flex-col justify-around'>
        <h1 className='mb-6 text-center text-8xl text-white'>
          FOREST
        </h1>
        <Card gap={16}>
          <div className='flex-[0.8]'>
            {!isAuth && <Login />}
            {isAuth && (
              <Character
                onSceneTransition={onSceneTransition}
                onLogout={onLogout}
              />
            )}
            <Message />
          </div>
          <div className='flex flex-[0.2] flex-col gap-4'>
            <Register />
            <Author />
          </div>
        </Card>
      </div>
    </Hero>
  );
};

export default LoginPage;
