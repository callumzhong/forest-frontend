import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import MessageContext from 'store/messageContext';
import { useNavigate } from '../../node_modules/react-router-dom/index';
let ws = new WebSocket(
  process.env.REACT_APP_WEBSOCKET_SERVER,
);
const useChatSocketApi = ({ name }) => {
  const navigate = useNavigate();
  const { onAdd } = useContext(MessageContext);
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
  const closeHandler = useCallback(
    (data) => {
      onAdd('info', '伺服器斷線返回登入畫面', 5000);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
    [onAdd, navigate],
  );

  useEffect(() => {
    if (ws.readyState === 3) {
      ws = new WebSocket(
        process.env.REACT_APP_WEBSOCKET_SERVER,
      );
    }
    ws.onopen = openHandler;
    ws.onclose = closeHandler;
    ws.onmessage = messageHandler;
    return () => {
      ws.removeEventListener('open', openHandler);
      ws.removeEventListener('close', closeHandler);
      ws.removeEventListener('message', messageHandler);
    };
  }, [closeHandler, messageHandler, openHandler]);
  return {
    messages,
    submitHandler,
    shownMessageHandler,
  };
};

export default useChatSocketApi;
