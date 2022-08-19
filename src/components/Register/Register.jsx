import useModal from 'hooks/useModal';
import Button from 'modules/Button';
import Card from 'modules/Card';
import Modal from 'modules/Modal';
import RegisterForm from './RegisterForm';

const Register = () => {
  const { onOpen, onClose, isOpen } = useModal();

  return (
    <>
      <Button width='full' onClick={onOpen}>
        註冊
      </Button>
      <Modal
        onRequestClose={onClose}
        contentLabel={'resister-modal'}
        isOpen={isOpen}
        
      >
        <Card>
          <h2 className='mb-6 text-center text-xl'>
            申請帳號
          </h2>
          <RegisterForm />
        </Card>
      </Modal>
    </>
  );
};

export default Register;
