import Alert from 'components/Alert/Alert';
import Auth from 'components/Auth/Auth';
import SceneTransition from 'components/SceneTransition/SceneTransition';
import useSceneTransition from 'hooks/useSceneTransition';
import GamePage from 'pages/GamePage';
import LoginPage from 'pages/LoginPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  const { isSceneTransition, sceneTransitionHandler } =
    useSceneTransition(true);

  return (
    <>
      <Alert />
      <SceneTransition isShow={isSceneTransition} />
      <Routes>
        <Route
          path='/'
          element={
            <Auth onSceneTransition={sceneTransitionHandler}>
              <GamePage
                onSceneTransition={sceneTransitionHandler}
              />
            </Auth>
          }
        />
        <Route
          path='/login'
          element={
            <LoginPage
              onSceneTransition={sceneTransitionHandler}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
