import { useCallback, useEffect, useState } from 'react';
const useChatSocketApi = ({ name }) => {
  const [ws, setWs] = useState(
    new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVER),
  );
  const [messages, setMessages] = useState([]);
  const submitHandler = (data) => {
    ws.send(`${name}：${data}`);
  };
  const shownMessageHandler = useCallback(() => {
    setMessages((prevState) =>
      prevState.map((state) => ({
        ...state,
        isShow: true,
      })),
    );
  }, []);
  const messageHandler = useCallback(({ data }) => {
    setMessages((prevState) => [
      ...prevState,
      { message: data, isShow: false },
    ]);
  }, []);
  const openHandler = useCallback((data) => {}, []);
  const closeHandler = useCallback((data) => {
    setWs(
      new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVER),
    );
  }, []);

  useEffect(() => {
    ws.onopen = openHandler;
    ws.onclose = closeHandler;
    ws.onmessage = messageHandler;
    return () => {
      ws.removeEventListener('open', openHandler);
      ws.removeEventListener('close', closeHandler);
      ws.removeEventListener('message', messageHandler);
    };
  }, [ws, closeHandler, messageHandler, openHandler]);
  return {
    ws,
    messages,
    submitHandler,
    shownMessageHandler,
  };
};

export default useChatSocketApi;
