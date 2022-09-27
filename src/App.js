import Alert from 'components/Alert/Alert';
import Auth from 'components/Auth/Auth';
import SceneTransition from 'components/SceneTransition/SceneTransition';
import emitter, { eventName } from 'emitter';
import useSceneTransition from 'hooks/useSceneTransition';
import GamePage from 'pages/GamePage';
import LoginPage from 'pages/LoginPage';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const { isSceneTransition, sceneTransitionHandler } =
    useSceneTransition(true);

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
