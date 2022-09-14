import { useCallback, useState } from 'react';

const useSceneTransition = (value) => {
  const [isSceneTransition, setSceneTransition] =
    useState(value);
  const sceneTransitionHandler = useCallback(
    (val) => setSceneTransition(val),
    [],
  );
  return {
    isSceneTransition,
    sceneTransitionHandler,
  };
};

export default useSceneTransition;
