import { useGetInventoryApi } from 'apis/useInventoryApi';
import Game from 'components/Game/Game';
import GameFooter from 'components/GameFooter/GameFooter';
import GameHeader from 'components/GameHeader/GameHeader';
import Gashapon from 'components/Gashapon/Gashapon';
import Talk from 'components/Talk/Task';
import useGameAction from 'hooks/useGameAction';
import useGameEvent from 'hooks/useGameEvent';
import useGameMap from 'hooks/useGameMap';
import useGameMessage from 'hooks/useGameMessage';
import useGameObjects from 'hooks/useGameObjects';
import { useEffect, useMemo, useState } from 'react';

const GamePage = () => {
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
  const { data: materials, getInventoryApi } =
    useGetInventoryApi();

  const { action, material, actionHandler, talkHandler } =
    useGameAction({ layer, getInventoryApi });

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
    getInventoryApi('MATERIAL');
  }, [getInventoryApi]);
  //TODO: 森林音效 map name === 'home'
  //TODO: 屋內音效 map name === 'chalet'
  //TODO: 偵測音效 action === fish 等於河邊 播放短暫河流聲
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
        getInventoryApi={getInventoryApi}
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
