import Card from 'modules/Card';

const TalkModal = ({ onClose, isOpen, message }) => {
  return (
    <Card>
      <p className='mb-6 text-lg'>{message.title}</p>
      <p className='text-lg'>{message.content}</p>
    </Card>
  );
};

export default TalkModal;
