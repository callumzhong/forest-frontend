import { useGetInventoryApi } from 'apis/useInventoryApi';
import useKeyPressListener from 'hooks/useKeyPressListener';
import useModal from 'hooks/useModal';
import { useEffect, useState } from 'react';
import Inventory from './Inventory';
import Setting from './Setting';
const GameHeader = ({
  materials: _materials,
  material,
}) => {
  const { data, getInventoryApi } = useGetInventoryApi();
  const [materials, setMaterials] = useState([]);
  // const [ore, setOre] = useState(0);
  // const [wood, setWood] = useState(0);
  // const [meat, setMeat] = useState(0);
  // const matchAmountHandler = (type) => {
  //   let result = '';
  //   switch (type) {
  //     case 'ORE':
  //       result = ore;
  //       break;
  //     case 'WOOD':
  //       result = wood;
  //       break;
  //     case 'MEAT':
  //       result = meat;
  //       break;
  //     default:
  //       throw new Error('不存在素材類型');
  //   }
  //   return result;
  // };
  // const matchSetAmountHandler = useCallback((value) => {
  //   switch (value.type) {
  //     case 'ORE':
  //       setOre((prev) => prev + value.amount);
  //       break;
  //     case 'WOOD':
  //       setWood((prev) => prev + value.amount);
  //       break;
  //     case 'MEAT':
  //       setMeat((prev) => prev + value.amount);
  //       break;
  //     default:
  //       throw new Error('不存在素材類型');
  //   }
  // }, []);
  const { isOpen, onOpen, onClose } = useModal();
  const openInventoryHandler = async () => {
    if (isOpen) return;
    await getInventoryApi();
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
  // useEffect(() => {
  //   if (!Array.isArray(materials)) return;
  //   materials.forEach((item) => {
  //     matchSetAmountHandler(item);
  //   });
  // }, [materials, matchSetAmountHandler]);
  // useEffect(() => {
  //   if (material) {
  //     matchSetAmountHandler(material);
  //   }
  // }, [material, matchSetAmountHandler]);

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
            data={data}
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
