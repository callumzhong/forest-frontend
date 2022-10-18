import useRegisterApi, {
  schema,
} from 'apis/useRegisterApi';
import useModal from 'hooks/useModal';
import Button from 'modules/Button';
import Card from 'modules/Card';
import Modal from 'modules/Modal';
import RegisterForm from './RegisterForm';

const Register = ({ onEnableAuthenticate }) => {
  const { onOpen, onClose, isOpen } = useModal();
  const { registerApi, isLoading } = useRegisterApi({
    onEnableAuthenticate,
    onClose,
  });
  const submitHandler = (data) => registerApi(data);

  return (
    <>
      <Button
        width='full'
        onClick={() => {
          onOpen();
        }}
      >
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
          <RegisterForm
            isLoading={isLoading}
            schema={schema}
            onSubmit={submitHandler}
          />
        </Card>
      </Modal>
    </>
  );
};

export default Register;
