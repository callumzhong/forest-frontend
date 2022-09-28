import { useGetInventoryApi } from 'apis/useInventoryApi';
import useKeyPressListener from 'hooks/useKeyPressListener';
import useModal from 'hooks/useModal';
import { useEffect, useState } from 'react';
import Inventory from './Inventory';
import Setting from './Setting';
const GameHeader = ({ materials: _materials }) => {
  const {
    data: props,
    getInventoryApi: getInventoryByPropApi,
  } = useGetInventoryApi({
    type: 'PROP',
  });
  const [materials, setMaterials] = useState([]);
  const { isOpen, onOpen, onClose } = useModal();
  const openInventoryHandler = async () => {
    if (isOpen) return;
    await getInventoryByPropApi();
    onOpen('inventory');
  };
  const openSettingHandler = () => {
    if (isOpen) return;
    onOpen('setting');
  };
  useKeyPressListener('KeyB', () => {
    if (isOpen) return;
    openInventoryHandler();
  });
  useKeyPressListener('Escape', () => {
    if (isOpen) return;
    openSettingHandler();
  });
  useEffect(() => {
    if (!_materials) return;
    setMaterials([..._materials]);
  }, [_materials]);

  return (
    <div className='absolute inset-x-0 top-0 flex items-center justify-between px-3 text-white'>
      <ul className='flex gap-3 text-lg'>
        {materials.map((material) => {
          return (
            <li
              key={material.type}
              className='flex items-center gap-2'
            >
              <img
                className='block w-6'
                src={material.url}
                alt={material.type}
              />
              <p>{material.amount}</p>
            </li>
          );
        })}
      </ul>
      <ul className='flex gap-3'>
        <li>
          <Inventory
            onUpdateProps={getInventoryByPropApi}
            data={props}
            isOpen={isOpen === 'inventory'}
            onOpen={openInventoryHandler}
            onClose={onClose}
          />
        </li>
        <li>
          <Setting
            isOpen={isOpen === 'setting'}
            onOpen={openSettingHandler}
            onClose={onClose}
          />
        </li>
      </ul>
    </div>
  );
};

export default GameHeader;
