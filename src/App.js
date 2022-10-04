import Alert from 'components/Alert/Alert';
import Auth from 'components/Auth/Auth';
import SceneTransition from 'components/SceneTransition/SceneTransition';
import emitter, { eventName } from 'emitter';
import useSceneTransition from 'hooks/useSceneTransition';
import useWindowSize from 'hooks/useWindowSize';
import GamePage from 'pages/GamePage';
import LoginPage from 'pages/LoginPage';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const { isSceneTransition, sceneTransitionHandler } =
    useSceneTransition(true);
  const windowSize = useWindowSize();

  useEffect(() => {
    emitter.on(
      eventName.sceneTransition,
      sceneTransitionHandler,
    );
    return () => {
      emitter.off(
        eventName.sceneTransition,
        sceneTransitionHandler,
      );
    };
  }, [sceneTransitionHandler]);
  if (windowSize === 'mobile') {
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center bg-black p-4 text-xl text-white'>
        <h2 className='mb-4 text-start'>親愛的玩家您好:</h2>
        <p>
          本專案體驗請使用桌上型電腦操作，造成不便敬請見諒。
        </p>
      </div>
    );
  }
  return (
    <>
      <Alert />
      <SceneTransition isShow={isSceneTransition} />
      <Routes>
        <Route
          path='/'
          element={
            <Auth>
              <GamePage />
            </Auth>
          }
        />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
