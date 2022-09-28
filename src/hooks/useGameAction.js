import { useCollectMaterialApi } from 'apis/useMaterial';
import emitter, { eventName } from 'emitter';
import { useCallback, useEffect, useState } from 'react';
import getRandomNumber from 'utils/getRandomNumber';
const useGameAction = ({
  layer,
  getInventoryByMaterialsApi,
}) => {
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
    //TODO: 判斷 action 動作播放特定音效 (循環)
    if (!action) return;
    if (!isAction) {
      setAction(action);
      setIsAction(true);
      emitter.emit(eventName.keyboard, {
        moving: false,
      });
      return;
    }
    //TODO: 此為關閉 action 動作音效 (循環)
    setMaterialRate((pervState) => ({
      ...pervState,
      target: getRandomNumber(pervState.min, pervState.max),
      current: 0,
    }));
    setAction('');
    setIsAction(false);
    emitter.emit(eventName.keyboard, {
      moving: true,
    });
  };
  const { data: material, collectMaterialApi } =
    useCollectMaterialApi();

  const materialHandler = useCallback(
    async (state) => {
      if (materialRate.current >= materialRate.target) {
        await collectMaterialApi(state.action);
        await getInventoryByMaterialsApi();
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
    [
      collectMaterialApi,
      getInventoryByMaterialsApi,
      materialRate,
    ],
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
