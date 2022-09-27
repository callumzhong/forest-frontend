import { useGetGashaponApi } from 'apis/useInventoryApi';
import clsx from 'clsx';
import Card from 'modules/Card';
import Modal from 'modules/Modal';
import { useEffect } from 'react';
import Machine from './Machine';

//TODO: 轉蛋打開特效把轉蛋變大 打開後淡出消失
const Gashapon = ({ isOpen, onClose, getInventoryApi }) => {
  const { data, error, clear, getGashaponApi } =
    useGetGashaponApi();
  const openHandler = async () => {
    await getGashaponApi();
    await getInventoryApi('MATERIAL');
  };
  const playHandler = () => {
    clear();
  };
  const closeHandler = () => {
    clear();
    onClose();
  };
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <Modal
      contentLabel={'gashapon-modal'}
      isOpen={isOpen}
      onRequestClose={closeHandler}
    >
      <Card>
        <div className='flex gap-6'>
          <Machine
            onPlay={playHandler}
            onOpen={openHandler}
          />
          <div className='relative flex-auto pb-8'>
            <p className='mb-6'>
              歡迎使用轉蛋機，需要收取材料如下:
            </p>
            <ul className='flex flex-col gap-4'>
              <li>消耗魚肉 * 50</li>
              <li>消耗石頭 * 50</li>
              <li>消耗木頭 * 50</li>
            </ul>
            <hr className='my-6' />
            <p className='mb-6'>結果:</p>
            <p
              className={clsx('text-center', {
                'text-red-500': error,
              })}
            >
              {data || error}
            </p>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default Gashapon;
