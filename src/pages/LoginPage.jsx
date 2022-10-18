import Author from 'components/Author/Author';
import Character from 'components/Character/Character';
import Login from 'components/Login/Login';
import Message from 'components/Login/Message';
import Register from 'components/Register/Register';
import { audio } from 'data/config';
import emitter, { eventName } from 'emitter';
import useAuthorization from 'hooks/useAuthorization';
import Card from 'modules/Card';
import Hero from 'modules/Hero';
import { useContext, useEffect } from 'react';
import AuthContext from 'store/authContext';
import sleep from 'utils/sleep';

const LoginPage = () => {
  const { onGetCharacter } = useContext(AuthContext);
  const {
    isAuth,
    disableAuthenticateHandler,
    enableAuthenticateHandler,
  } = useAuthorization();

  useEffect(() => {
    const fn = async () => {
      await sleep(500);
      emitter.emit(eventName.sceneTransition, false);
    };
    window.addEventListener('load', fn);

    return () => {
      window.removeEventListener('load', fn);
    };
  }, []);

  useEffect(() => {
    disableAuthenticateHandler();
  }, [disableAuthenticateHandler]);

  useEffect(() => {
    const listener = () => {
      if (!audio.map.playing()) {
        audio.map.play();
      }
    };
    window.addEventListener('click', listener);
    return () => {
      window.removeEventListener('click', listener);
    };
  }, []);

  useEffect(() => {
    if (isAuth) {
      onGetCharacter();
    }
  }, [isAuth, onGetCharacter]);

  return (
    <Hero className={'h-screen py-6'}>
      <div className='container mx-auto flex h-full w-3/5 flex-col justify-around'>
        <h1 className='mb-6 text-center text-8xl text-white'>
          FOREST
        </h1>
        <Card gap={16}>
          <div className='flex-[0.8]'>
            {!isAuth && (
              <Login
                onEnableAuthenticate={
                  enableAuthenticateHandler
                }
              />
            )}
            {isAuth && (
              <Character
                onDisableAuthenticate={
                  disableAuthenticateHandler
                }
              />
            )}
            <Message />
          </div>
          <div className='flex flex-[0.2] flex-col gap-4'>
            <Register
              onEnableAuthenticate={
                enableAuthenticateHandler
              }
            />
            <Author />
          </div>
        </Card>
      </div>
    </Hero>
  );
};

export default LoginPage;
