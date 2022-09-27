import { useGetInventoryApi } from 'apis/useInventoryApi';
import Button from 'modules/Button';
import Card from 'modules/Card';
import Modal from 'modules/Modal';
import { useEffect } from 'react';

const Inventory = ({ isOpen, data,onOpen, onClose }) => {
  const clickHandler = (id) => {};
  return (
    <>
      <button
        onClick={onOpen}
        className='hover:text-gray-500 active:text-gray-700'
      >
        物品 [B]
      </button>
      <Modal
        onRequestClose={onClose}
        contentLabel={'setting-modal'}
        isOpen={ isOpen}
      >
        <Card>
          <h2 className='mb-6 text-center text-2xl'>
            物品欄
          </h2>
          <ul
            className='flex max-h-96 flex-col gap-4  overscroll-y-auto px-6  
          scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-amber-600'
          >
            {Array.isArray(data) &&
              data.map((item) => (
                <li
                  key={item._id}
                  className='flex items-center gap-6'
                >
                  <img
                    width={32}
                    height={32}
                    src={item.url}
                    alt={item.name}
                  />
                  <span className='mr-auto'>
                    {item.name}
                  </span>
                  <span>數量</span>
                  <span>{item.amount}</span>
                  <Button
                    onClick={() => {
                      clickHandler(item._id);
                    }}
                    disabled={item.amount === 0}
                  >
                    使用
                  </Button>
                </li>
              ))}
          </ul>
        </Card>
      </Modal>
    </>
  );
};

export default Inventory;
<Inventory />;
