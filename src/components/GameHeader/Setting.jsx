import Button from 'modules/Button';
import Card from 'modules/Card';
import Modal from 'modules/Modal';
import { useContext } from 'react';
import AuthContext from 'store/authContext';

const Setting = ({ isOpen, onOpen, onClose }) => {
  const { onLogout } = useContext(AuthContext);
  return (
    <>
      <button
        onClick={onOpen}
        className='hover:text-gray-500 active:text-gray-700'
      >
        設定 [Esc]
      </button>
      <Modal
        onRequestClose={onClose}
        contentLabel={'setting-modal'}
        isOpen={isOpen}
      >
        <Card>
          <h2 className='mb-6 text-center text-xl'>設定</h2>
          <ul className='text-center text-lg'>
            <li>
              <Button onClick={onLogout}>登出</Button>
            </li>
          </ul>
        </Card>
      </Modal>
    </>
  );
};

export default Setting;
