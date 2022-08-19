import Alert from 'components/Alert/Alert';
import Auth from 'components/Auth/Auth';
import GamePage from 'pages/GamePage';
import LoginPage from 'pages/LoginPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Alert />
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
