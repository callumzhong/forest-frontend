import { useGetInventoryApi } from 'apis/useInventoryApi';
import useKeyPressListener from 'hooks/useKeyPressListener';
import useModal from 'hooks/useModal';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'store/authContext';
import Inventory from './Inventory';
import Setting from './Setting';
const GameHeader = ({ materials: _materials }) => {
  const {
    data: props,
    getInventoryApi: getInventoryByPropApi,
  } = useGetInventoryApi({
    type: 'PROP',
  });
  const { character, onGetCharacter } =
    useContext(AuthContext);
  const [materials, setMaterials] = useState([]);
  const [attributes, setAttributes] = useState();
  const { isOpen, onOpen, onClose } = useModal();
  const updateHandler = () => {
    getInventoryByPropApi();
    onGetCharacter();
  };
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
  useEffect(() => {
    if (!character) return;
    setAttributes(character.attributes);
  }, [character]);

  return (
    <div className='absolute inset-x-0 top-0 flex items-start justify-between px-3 text-white'>
      <div>
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
        {attributes && (
          <ul>
            <li>{`飽食度 ${attributes.satiety}/300`}</li>
            <li>{`情緒值 ${attributes.mood}/100`}</li>
          </ul>
        )}
      </div>
      <ul className='flex gap-3'>
        <li>
          <Inventory
            onUpdate={updateHandler}
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
