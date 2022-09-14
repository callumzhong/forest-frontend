import * as config from 'data/config';
import { useEffect, useState } from 'react';

const useGameObjects = ({ map: { name } }) => {
  const [gameObjects, setGameObjects] = useState();
  useEffect(() => {
    let currentGameObjects = config.gameObjects[name];
    setGameObjects(currentGameObjects);
  }, [name]);

  return {
    gameObjects,
  };
};

export default useGameObjects;
