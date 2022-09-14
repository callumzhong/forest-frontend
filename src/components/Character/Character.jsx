import Button from 'modules/Button.jsx';
import Input from 'modules/Input.jsx';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from 'store/authContext';
import sleep from 'utils/sleep.js';
import CharacterForm from './CharacterForm';
const Character = ({ onLogout, onSceneTransition }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.form?.pathname || '/';
  const startHandler = async () => {
    onSceneTransition(true);
    await sleep(1000);
    navigate(from, { replace: true });
  };
  const { onGetCharacter, character } =
    useContext(AuthContext);
  if (!character) {
    return (
      <>
        <h2 className='mb-4 text-center'>建立角色</h2>
        <CharacterForm
          onLogout={onLogout}
          onGetCharacter={onGetCharacter}
        />
      </>
    );
  }
  return (
    character && (
      <>
        <h2 className='mb-4 text-center'>角色選單</h2>
        <Input
          disabled={true}
          label='名稱'
          maxLength={12}
          basis={8}
          value={character.name}
        />
        <div className='my-6 flex justify-end gap-4'>
          <Button onClick={startHandler}>進入遊戲</Button>
        </div>
      </>
    )
  );
};

export default Character;
