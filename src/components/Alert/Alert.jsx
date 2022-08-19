import { useContext, useEffect } from 'react';
import MessageContext from 'store/messageContext';
import Error from './Error';
import Info from './Info';
import Success from './Success';
import Validation from './Validation';
import Warning from './Warning';

const elements = {
  info: Info,
  warning: Warning,
  success: Success,
  error: Error,
  validation: Validation,
};

const Alert = () => {
  const { messages, onRemove } = useContext(MessageContext);
  const closeHandler = (id) => () => {
    onRemove(id);
  };
  useEffect(() => {
    if (messages && messages.length === 0) return;
    messages.forEach((item) => {
      if (!item.timeout) return;
      setTimeout(() => {
        onRemove(item.id);
      }, item.timeout);
    });
  }, [messages, onRemove]);

  if (messages && messages.length === 0) return;
  return (
    <div className='absolute top-2 right-2 z-50 w-80'>
      {messages.map((message) => {
        const { mode, text, id } = message;
        const Element = elements[mode];
        return (
          <Element
            key={id}
            onClose={closeHandler(id)}
            className='mb-2'
            children={text}
          />
        );
      })}
    </div>
  );
};

export default Alert;
