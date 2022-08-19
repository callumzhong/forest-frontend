import React, { useCallback, useState } from 'react';
import uniqid from 'uniqid';

const MessageContext = React.createContext({
  messages: [
    {
      id: '',
      mode: 'info || error',
      text: '',
      timeout: 0,
    },
  ],
  onAdd: () => {},
  onRemove: () => {},
});

export const MessageContextProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const addMessageHandler = useCallback(
    (mode, text, timeout) => {
      const updated = {
        id: uniqid(),
        mode,
        text,
      };

      if (timeout) {
        updated.timeout = timeout;
      }
      setMessages((prevState) => [...prevState, updated]);
    },
    [],
  );

  const removeMessageHandler = useCallback((id) => {
    setMessages((prevState) =>
      prevState
        .filter((item) => item.id !== id)
        .map((item) => item),
    );
  }, []);

  return (
    <MessageContext.Provider
      value={{
        messages: messages,
        onAdd: addMessageHandler,
        onRemove: removeMessageHandler,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
