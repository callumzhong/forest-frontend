import { useCollectMaterialApi } from 'apis/useMaterial';
import emitter, { eventName } from 'emitter';
import { useCallback, useEffect, useState } from 'react';
import getRandomNumber from 'utils/getRandomNumber';
const useGameAction = ({ layer }) => {
  const [isAction, setIsAction] = useState(false);
  const [action, setAction] = useState();
  const [materialRate, setMaterialRate] = useState({
    min: 1,
    max: 4,
    target: 0,
    current: 0,
  });
  const talkHandler = () => {
    layer.checkForTalkCutscene();
  };
  const actionHandler = () => {
    const action = layer.checkForActionSpaces('action');
    console.log(action);
    setMaterialRate((pervState) => ({
      ...pervState,
      target: getRandomNumber(pervState.min, pervState.max),
      current: 0,
    }));
    if (!isAction) {
      setAction(action);
      setIsAction(true);
      emitter.emit(eventName.keyboard, {
        moving: false,
      });
      return;
    }
    setAction('');
    setIsAction(false);
    emitter.emit(eventName.keyboard, {
      moving: true,
    });
  };
  const { data: material, collectMaterialApi } =
    useCollectMaterialApi();

  const materialHandler = useCallback(
    (state) => {
      if (materialRate.current >= materialRate.target) {
        collectMaterialApi(state.action);
        setMaterialRate((pervState) => ({
          ...pervState,
          target: getRandomNumber(
            pervState.min,
            pervState.max,
          ),
          current: 0,
        }));
        return;
      }
      setMaterialRate((pervState) => ({
        ...pervState,
        current: pervState.current + 1,
      }));
    },
    [collectMaterialApi, materialRate],
  );

  useEffect(() => {
    emitter.on(eventName.material, materialHandler);
    return () => {
      emitter.off(eventName.material, materialHandler);
    };
  }, [materialHandler]);

  return {
    action,
    material,
    talkHandler,
    actionHandler,
  };
};

export default useGameAction;
