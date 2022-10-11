import useChatSocketApi from 'apis/useChatSocketApi';
import clsx from 'clsx';
import emitter, { eventName } from 'emitter';
import useModal from 'hooks/useModal';
import Card from 'modules/Card';
import Modal from 'modules/Modal';
import { useContext, useEffect } from 'react';
import AuthContext from 'store/authContext';
import Chat from './Chat';

const ChatRoom = () => {
  const { character } = useContext(AuthContext);
  const { submitHandler, shownMessageHandler, messages,ws} =
    useChatSocketApi({
      name: character.name,
    });
  const { isOpen, onOpen, onClose } = useModal();
  const openHandler = () => {
    onOpen();
    emitter.emit(eventName.keyboard, {
      enter: false,
      space: false,
      moving: false,
    });
  };
  const closeHandler = () => {
    onClose();
    emitter.emit(eventName.keyboard, {
      enter: true,
      space: true,
      moving: true,
    });
  };

  useEffect(() => {
    if (
      isOpen &&
      messages.some((message) => message.isShow === false)
    ) {
      shownMessageHandler();
    }
  }, [messages, shownMessageHandler, isOpen]);

  let hint = messages.filter(
    (message) => message.isShow === false,
  ).length;
  if (hint > 99) {
    hint = '+99';
  }
  return (
    <>
      <button
        className='relative block rounded-full border p-3 leading-[2] shadow-inner outline-none disabled:text-gray-400 disabled:shadow-gray-500'
        type='button'
        onClick={openHandler}
      >
        {
          <div
            className={clsx(
              'absolute -top-1 -right-1 h-8 w-8 animate-bounce rounded-full bg-red-700 bg-opacity-80 text-base leading-8 text-white',
              {
                hidden:
                  !messages.length ||
                  messages.every(
                    (message) => message.isShow === true,
                  ),
              },
            )}
          >
            {hint}
          </div>
        }
        聊天
      </button>
      <Modal
        isOpen={isOpen}
        contentLabel='chat-room-modal'
        onRequestClose={closeHandler}
      >
        <Card>
          <Chat
          ws={ws}
            onSubmit={submitHandler}
            messages={messages}
          />
        </Card>
      </Modal>
    </>
  );
};

export default ChatRoom;
