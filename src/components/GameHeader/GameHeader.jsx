import useKeyPressListener from 'hooks/useKeyPressListener';
import useModal from 'hooks/useModal';
import { useCallback, useEffect, useState } from 'react';
import Inventory from './Inventory';
import Setting from './Setting';
const GameHeader = ({ materials, material }) => {
  const {
    isOpen: isOpenInventory,
    onOpen: onOpenInventory,
    onClose: onCloseInventory,
  } = useModal();
  const {
    isOpen: isOpenSetting,
    onOpen: onOpenSetting,
    onClose: onCloseSetting,
  } = useModal();
  const [ore, setOre] = useState(0);
  const [wood, setWood] = useState(0);
  const [meat, setMeat] = useState(0);
  const matchAmountHandler = (type) => {
    let result = '';
    switch (type) {
      case 'ORE':
        result = ore;
        break;
      case 'WOOD':
        result = wood;
        break;
      case 'MEAT':
        result = meat;
        break;
      default:
        throw new Error('不存在素材類型');
    }
    return result;
  };
  const matchSetAmountHandler = useCallback((value) => {
    switch (value.type) {
      case 'ORE':
        setOre((prev) => prev + value.amount);
        break;
      case 'WOOD':
        setWood((prev) => prev + value.amount);
        break;
      case 'MEAT':
        setMeat((prev) => prev + value.amount);
        break;
      default:
        throw new Error('不存在素材類型');
    }
  }, []);
  useKeyPressListener('KeyB', () => {
    if (isOpenSetting) return;
    onOpenInventory();
  });
  useKeyPressListener('Escape', () => {
    if (isOpenInventory) return;
    onOpenSetting();
  });
  useEffect(() => {
    if (!Array.isArray(materials)) return;
    materials.forEach((item) => {
      matchSetAmountHandler(item);
    });
  }, [materials, matchSetAmountHandler]);

  useEffect(() => {
    if (material) {
      matchSetAmountHandler(material);
    }
  }, [material, matchSetAmountHandler]);

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
              <p>{matchAmountHandler(material.type)}</p>
            </li>
          );
        })}
      </ul>
      <ul className='flex gap-3'>
        <li>
          <Inventory
            isOpen={isOpenInventory}
            onClose={onCloseInventory}
          />
        </li>
        <li>
          <Setting
            isOpen={isOpenSetting}
            onClose={onCloseSetting}
          />
        </li>
      </ul>
    </div>
  );
};

export default GameHeader;
