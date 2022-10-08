import ChatRoom from 'components/ChatRoom/ChatRoom';
import { useEffect, useState } from 'react';
import Button from './Button';

const GameFooter = ({ onAction, onTalk, material }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!material) return;
    setMessages((prevMessages) => {
      const result = [
        ...prevMessages,
        `取得${material.name} * ${material.amount}`,
      ];
      if (prevMessages.length > 4) {
        result.splice(0, 1);
      }
      return result;
    });
  }, [material]);

  return (
    <>
      <div className='absolute inset-x-2 bottom-4 flex justify-between text-white'>
        <div className='w-2/6 self-end text-yellow-500'>
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <div className='flex flex-col gap-4 self-end'>
          <Button onClick={onTalk}>對話</Button>
          <Button onClick={onAction}>動作</Button>
          <ChatRoom></ChatRoom>
        </div>
      </div>
    </>
  );
};

export default GameFooter;
