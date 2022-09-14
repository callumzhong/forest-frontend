import useHttp from 'hooks/useHttp';
import { useCallback } from 'react';

const useGetMaterialApi = () => {
  const { data, sendRequest } = useHttp();
  const getMaterialApi = useCallback(
    () =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/inventory?type=material`,
        method: 'GET',
        useToken: true,
      }).catch(() => {}),
    [sendRequest],
  );
  return { data, getMaterialApi };
};

const useCollectMaterialApi = () => {
  const { data, sendRequest } = useHttp();
  const collectMaterialApi = useCallback(
    (action) => {
      let type = '';
      switch (action) {
        case 'fish':
          type = 'MEAT';
          break;
        case 'chop':
          type = 'WOOD';
          break;
        case 'mining':
          type = 'ORE';
          break;
        default:
          throw new Error('動作匹配不到素材');
      }
      return sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/material/collect`,
        method: 'POST',
        body: JSON.stringify({
          type: type,
        }),
        useToken: true,
      }).catch(() => {});
    },
    [sendRequest],
  );
  return { data, collectMaterialApi };
};

export { useCollectMaterialApi, useGetMaterialApi };
