import emitter, { eventName } from 'emitter';
import { useCallback, useEffect, useState } from 'react';
import useModal from './useModal';

const useGameMessage = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const [message, setMessage] = useState({
    mode: '',
    title: '',
    content: '',
    onComplete: '',
  });

  const closeHandler = useCallback(() => {
    const { onComplete, next } = message;
    onComplete();
    if (!next) {
      onClose();
    }
  }, [message, onClose]);

  useEffect(() => {
    const messageHandler = (e) => {
      setMessage((prevMessage) => ({
        ...prevMessage,
        ...e,
        type: 'textMessage',
      }));
      onOpen(e.mode);
    };

    emitter.on(eventName.textMessage, messageHandler);
    return () => {
      emitter.off(eventName.textMessage, messageHandler);
    };
  }, [onOpen]);

  return {
    message,
    isOpen,
    onClose: closeHandler,
  };
};

export default useGameMessage;
