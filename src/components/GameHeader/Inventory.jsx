import Card from 'modules/Card';
import Modal from 'modules/Modal';

const Inventory = ({ isOpen, onClose }) => {
  return (
    <>
      <button className='hover:text-gray-500 active:text-gray-700'>
        物品 [B]
      </button>
      <Modal
        onRequestClose={onClose}
        contentLabel={'setting-modal'}
        isOpen={isOpen}
      >
        <Card>
          <h2 className='mb-6 text-center text-xl'>物品</h2>
        </Card>
      </Modal>
    </>
  );
};

export default Inventory;
