import emitter, { eventName } from 'emitter';
import { useCallback, useEffect, useState } from 'react';
import Bait from 'scripts/Bait';
import Layer from 'scripts/Layer';
import Person from 'scripts/Person';
import isEmptyObject from 'utils/isEmptyObject';
import sleep from 'utils/sleep';
import useKeyPressDirectionListener from './useKeyPressDirectionListener';
import useKeyPressListener from './useKeyPressListener';
import useRequestAnimationFrame from './useRequestAnimationFrame';

const useGameEvent = ({
  isLoaded,
  action,
  gameObjects,
  gameMap,
  setMap,
  layer,
  setLayer,
  onSceneTransition,
  map: { onComplete },
  talkHandler,
  actionHandler,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [keyBoard, setKeyBoard] = useState({
    enter: true,
    space: true,
    moving: true,
  });
  const directions = useKeyPressDirectionListener(
    keyBoard.moving,
  );
  const updateLayer = useCallback(
    (layer) => {
      const { gameObjects, walls, ...otherConfig } = layer;
      const gameObjectEntities = Object.keys(
        gameObjects,
      ).reduce((obj, key) => {
        if (key.includes('bait')) {
          return {
            ...obj,
            [key]: new Bait(gameObjects[key]),
          };
        }
        return {
          ...obj,
          [key]: new Person(gameObjects[key]),
        };
      }, {});

      setLayer(
        new Layer({
          gameObjects: gameObjectEntities,
          walls: { ...walls },
          ...otherConfig,
        }),
      );

      setKeyBoard({
        enter: true,
        space: true,
        moving: true,
      });
    },
    [setLayer],
  );

  const checkForWalkHandler = useCallback(
    (e) => {
      if (isEmptyObject(layer)) return;
      if (e.whoId === 'hero') {
        layer.checkForFootstepCutscene();
      }
    },
    [layer],
  );

  const changeMapHandler = useCallback(
    (e) => {
      const { map, data, onComplete } = e;
      const changeMap = async () => {
        onSceneTransition(true);
        await sleep(1000);
        setMap({ name: map, data, onComplete });
      };
      changeMap();
    },
    [onSceneTransition, setMap],
  );

  const keyBoardHandler = useCallback((e) => {
    setKeyBoard((val) => ({
      ...val,
      ...e,
    }));
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    updateLayer({ ...gameMap, gameObjects });
    // LayerEvent onComplete
    onComplete();
  }, [
    isLoaded,
    gameMap,
    gameObjects,
    updateLayer,
    onComplete,
  ]);

  useEffect(() => {
    if (isEmptyObject(layer)) return;
    const mounted = async () => {
      layer.mountObjects();
      onSceneTransition(false);
      setIsMounted(true);
    };
    mounted();
  }, [layer, onSceneTransition]);

  useEffect(() => {
    emitter.on(eventName.walk, checkForWalkHandler);
    emitter.on(eventName.changeMap, changeMapHandler);
    emitter.on(eventName.keyboard, keyBoardHandler);
    return () => {
      emitter.off(eventName.changeMap, changeMapHandler);
      emitter.off(eventName.keyboard, keyBoardHandler);
      emitter.off(eventName.walk, checkForWalkHandler);
    };
  }, [
    changeMapHandler,
    keyBoardHandler,
    checkForWalkHandler,
  ]);

  useRequestAnimationFrame(() => {
    if (isEmptyObject(layer)) return;
    Object.values(layer.gameObjects).forEach((object) => {
      if (!('update' in object)) return;
      object.update({
        arrow: directions[0],
        map: layer,
        action: action,
      });
    });
  });

  useKeyPressListener('Enter', () => {
    if (!keyBoard.enter) return;
    talkHandler();
  });
  useKeyPressListener('Space', () => {
    if (!keyBoard.enter) return;
    actionHandler();
  });

  return {
    isMounted,
    layer,
    keyBoard,
  };
};

export default useGameEvent;
