import Author from 'components/Author/Author';
import Character from 'components/Character/Character';
import Login from 'components/Login/Login';
import Message from 'components/Login/Message';
import Register from 'components/Register/Register';
import { audio } from 'data/config';
import emitter, { eventName } from 'emitter';
import Card from 'modules/Card';
import Hero from 'modules/Hero';
import { useContext, useEffect } from 'react';
import AuthContext from 'store/authContext';
import sleep from 'utils/sleep';

const LoginPage = () => {
  const { onLogout, isAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await sleep(1000);
      emitter.emit(eventName.sceneTransition, false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  useEffect(() => {
    audio.home.play();
    return () => {
      if (audio.home.playing()) {
        audio.home.unload();
      }
    };
  }, []);

  return (
    <Hero className={'h-screen py-6'}>
      <div className='container mx-auto flex h-full w-3/5 flex-col justify-around'>
        <h1 className='mb-6 text-center text-8xl text-white'>
          FOREST
        </h1>
        <Card gap={16}>
          <div className='flex-[0.8]'>
            {!isAuth && <Login />}
            {isAuth && <Character onLogout={onLogout} />}
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
