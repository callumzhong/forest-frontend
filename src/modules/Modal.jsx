import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

const Modal = ({
  isOpen,
  onAfterOpen,
  onAfterClose,
  onRequestClose,
  contentLabel,
  children,
}) => {
  return (
    <ReactModal
      shouldFocusAfterRender={false}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      overlayClassName='fixed inset-0 bg-[rgba(0,0,0,0.8)]'
      className='absolute inset-0 m-auto h-max overflow-auto lg:inset-x-1/4 lg:inset-y-6 lg:w-auto'
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
