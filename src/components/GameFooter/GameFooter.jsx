import { useEffect, useState } from 'react';
import ButtonAction from './ButtonAction';
import ButtonTalk from './ButtonTalk';

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
    <div className='absolute inset-x-2 bottom-4 flex justify-between text-white'>
      <div className='w-2/6 self-end text-yellow-500'>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div className='flex flex-col gap-4 self-end'>
        <ButtonTalk onClick={onTalk}>對話</ButtonTalk>
        <ButtonAction onClick={onAction}>動作</ButtonAction>
      </div>
    </div>
  );
};

export default GameFooter;
