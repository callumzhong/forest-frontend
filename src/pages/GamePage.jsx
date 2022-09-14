import { useGetMaterialApi } from 'apis/useMaterial';
import Game from 'components/Game/Game';
import GameFooter from 'components/GameFooter/GameFooter';
import GameHeader from 'components/GameHeader/GameHeader';
import Store from 'components/Store/Store';
import TalkModal from 'components/TalkModal/TaskModal';
import useGameAction from 'hooks/useGameAction';
import useGameEvent from 'hooks/useGameEvent';
import useGameMap from 'hooks/useGameMap';
import useGameMessage from 'hooks/useGameMessage';
import useGameObjects from 'hooks/useGameObjects';
import Modal from 'modules/Modal';
import { useEffect, useMemo, useState } from 'react';

const GamePage = ({ onSceneTransition }) => {
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
  const { action, material, actionHandler, talkHandler } =
    useGameAction({ layer });

  const { isMounted, keyBoard } = useGameEvent({
    layer,
    setLayer,
    isLoaded,
    action,
    gameObjects,
    gameMap,
    setMap,
    map,
    onSceneTransition,
    talkHandler,
    actionHandler,
  });
  const { isOpen, onClose, message } = useGameMessage();

  const { data: materials, getMaterialApi } =
    useGetMaterialApi();

  useEffect(() => {
    getMaterialApi();
  }, [getMaterialApi]);

  return (
    <>
      <Modal
        onRequestClose={onClose}
        contentLabel={'message-modal'}
        isOpen={true}
      >
        {message.mode === 'message' && (
          <TalkModal message={message} />
        )}
        {message.mode === 'store' && <Store />}
        <Store />
      </Modal>
      <div className='absolute inset-0 m-auto overflow-hidden bg-black'>
        <GameHeader
          material={material}
          materials={materials ?? []}
        />
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
