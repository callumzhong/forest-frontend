import { useRef } from 'react';

const Chat = ({ ws, messages, onSubmit }) => {
  const ref = useRef();

  if (ws.readyState !== 1) {
    return <p>通訊連線中請稍後...</p>;
  }

  return (
    <>
      <div
        ref={ref}
        className='h-80 overflow-auto py-2 pr-2 scrollbar-thin scrollbar-track-white scrollbar-thumb-yellow-600'
      >
        {messages.length === 0 && (
          <p className='text-lg'>
            歡迎來到全體聊天室，當前沒有聊天訊息。
          </p>
        )}
        {messages.map((item, idx) => {
          return <p key={idx}>{item.message}</p>;
        })}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(ref.current.value);
          ref.current.value = '';
        }}
      >
        <input
          required
          placeholder='按下 Enter 發送'
          ref={ref}
          className='w-full px-2 text-lg text-black'
          type='text'
        />
      </form>
    </>
  );
};
export default Chat;
