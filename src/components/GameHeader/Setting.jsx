import Card from 'modules/Card';
import Modal from 'modules/Modal';

const Setting = ({ isOpen, onClose }) => {
  return (
    <>
      <button className='hover:text-gray-500 active:text-gray-700'>
        設定 [Esc]
      </button>
      <Modal
        onRequestClose={onClose}
        contentLabel={'setting-modal'}
        isOpen={isOpen}
      >
        <Card>
          <h2 className='mb-6 text-center text-xl'>設定</h2>
        </Card>
      </Modal>
    </>
  );
};

export default Setting;
