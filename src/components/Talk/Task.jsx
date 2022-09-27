import Card from 'modules/Card';
import Modal from 'modules/Modal';

const Talk = ({ onClose, isOpen, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={'message-modal'}
    >
      <Card>
        <p className='mb-6 text-lg'>{message.title}</p>
        <p className='whitespace-pre-wrap text-lg'>
          {message.content}
        </p>
      </Card>
    </Modal>
  );
};

export default Talk;
