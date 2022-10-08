import { useGetInventoryApi } from 'apis/useInventoryApi';
import Game from 'components/Game/Game';
import GameFooter from 'components/GameFooter/GameFooter';
import GameHeader from 'components/GameHeader/GameHeader';
import Gashapon from 'components/Gashapon/Gashapon';
import Talk from 'components/Talk/Task';
import { audio } from 'data/config';
import dayjs from 'dayjs';
import useGameAction from 'hooks/useGameAction';
import useGameEvent from 'hooks/useGameEvent';
import useGameMap from 'hooks/useGameMap';
import useGameMessage from 'hooks/useGameMessage';
import useGameObjects from 'hooks/useGameObjects';
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AuthContext from 'store/authContext';
const GamePage = () => {
  const { onUpdateCharacter, character } =
    useContext(AuthContext);
  const [layer, setLayer] = useState({});
  const [map, setMap] = useState({
    name: 'home',
    data: {},
    onComplete: () => {},
  });
  const { gameMap } = useGameMap({ map });
  const { gameObjects } = useGameObjects({
    map,
  });

  const isLoaded = useMemo(
    () => gameMap && gameObjects,
    [gameMap, gameObjects],
  );
  const {
    data: materials,
    getInventoryApi: getInventoryByMaterialsApi,
  } = useGetInventoryApi({ type: 'MATERIAL' });

  const { action, material, actionHandler, talkHandler } =
    useGameAction({
      layer,
      getInventoryByMaterialsApi,
    });

  const { isMounted, keyBoard } = useGameEvent({
    layer,
    setLayer,
    isLoaded,
    action,
    gameObjects,
    gameMap,
    setMap,
    map,
    talkHandler,
    actionHandler,
  });
  const { isOpen, onClose, message } = useGameMessage();

  useEffect(() => {
    getInventoryByMaterialsApi();
  }, [getInventoryByMaterialsApi]);

  useEffect(() => {
    const listener = () => {
      if (!audio.map.playing()) {
        audio.map.play();
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
      audio.map.stop();
    };
  }, []);

  useEffect(() => {
    const intervalID = setInterval(
      onUpdateCharacter,
      300000,
    );
    return () => {
      clearInterval(intervalID);
    };
  }, [onUpdateCharacter]);

  useEffect(() => {
    const diff = dayjs().diff(
      character.updatedAt,
      'minute',
    );
    if (5 > diff) return;
    const satiety = Math.trunc(diff / 5) * 2;
    const mood = Math.trunc(diff / 5) * 1;
    onUpdateCharacter(satiety, mood);
  }, [character, onUpdateCharacter]);

  return (
    <>
      <Talk
        isOpen={isOpen === 'message'}
        onClose={onClose}
        message={message}
      />
      <Gashapon
        isOpen={isOpen === 'gashapon'}
        onClose={onClose}
        getInventoryByMaterialsApi={
          getInventoryByMaterialsApi
        }
      />
      <div className='absolute inset-0 m-auto overflow-hidden bg-black'>
        <GameHeader materials={materials} />
        {isMounted && <Game layer={layer} />}
        <GameFooter
          keyBoard={keyBoard}
          material={material}
          onAction={actionHandler}
          onTalk={talkHandler}
        />
      </div>
    </>
  );
};
export default GamePage;
