import * as config from 'data/config';
import { useEffect, useState } from 'react';

const useGameMap = ({ map: { name } }) => {
  const [gameMap, setGameMap] = useState();

  useEffect(() => {
    const currentGameMap = config.layers[name];
    setGameMap(currentGameMap);
  }, [name]);

  return {
    gameMap,
  };
};

export default useGameMap;
