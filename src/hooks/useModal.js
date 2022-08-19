const { useState, useCallback } = require('react');

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenHandler = useCallback(() => setIsOpen(true), []);
  const onCloseHandler = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    onOpen: onOpenHandler,
    onClose: onCloseHandler,
  };
};

export default useModal;
