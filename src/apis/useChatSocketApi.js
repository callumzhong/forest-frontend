import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import MessageContext from 'store/messageContext';
import { useNavigate } from '../../node_modules/react-router-dom/index';

const ws = new WebSocket('ws://localhost:3001');
const useChatSocketApi = ({ name }) => {
  const navigate = useNavigate();
  const { onAdd } = useContext(MessageContext);
  const [messages, setMessages] = useState([]);
  const submitHandler = (data) => {
    console.log(data);
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
    console.log(
      '🚀 ~ file: useChatSocketApi.js ~ line 6 ~ messageHandler ~ data',
      data,
    );
    setMessages((prevState) => [
      ...prevState,
      { message: data, isShow: false },
    ]);
  }, []);
  const openHandler = (data) => {
    console.log(
      '🚀 ~ file: useChatSocketApi.js ~ line 15 ~ openHandler ~ data',
      data,
    );
    return {};
  };
  const closeHandler = (data) => {
    onAdd('info', '伺服器斷線返回登入畫面', 5000);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };
  useEffect(() => {
    ws.onopen = openHandler;
    ws.onclose = closeHandler;
    ws.onmessage = messageHandler;
    return () => {
      ws.removeEventListener('open', openHandler);
      ws.removeEventListener('close', closeHandler);
      ws.removeEventListener('message', messageHandler);
    };
  });
  return {
    messages,
    submitHandler,
    shownMessageHandler,
  };
};

export default useChatSocketApi;
