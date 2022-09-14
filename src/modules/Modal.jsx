import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

const containerStyles = {
  center:
    'absolute inset-0 m-auto h-max overflow-auto outline-none lg:inset-x-1/4 lg:inset-y-6 lg:w-auto',
};
const overlayStyles = {
  center: 'fixed inset-0 bg-[rgba(0,0,0,0.5)]',
};

const Modal = ({
  isOpen,
  onAfterOpen,
  onAfterClose,
  onRequestClose,
  contentLabel,
  children,
  mode = 'center',
}) => {
  return (
    <ReactModal
      shouldFocusAfterRender={true}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      overlayClassName={overlayStyles[mode]}
      className={containerStyles[mode]}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
