import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import MessageContext from 'store/messageContext';

let ws = null;
let wsTimerID = null;

const useChatSocketApi = ({ name }) => {
  const config = useState({
    url: process.env.REACT_APP_WEBSOCKET_SERVER,
    timerID: null,
    timerCount: 0,
  })[0];
  const [messages, setMessages] = useState([]);
  const { onAdd } = useContext(MessageContext);
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

  useEffect(() => {
    function initWebSocket() {
      if (typeof WebSocket !== 'undefined') {
        config.timerCount++;
        ws = new WebSocket(config.url);
        ws.onopen = openHandler;
        ws.onclose = closeHandler;
        ws.onmessage = messageHandler;
      } else {
        onAdd(
          'info',
          '當前瀏覽器不支援聊天室功能，建議使用 Chrome 瀏覽器',
          2000,
        );
      }
    }

    function openHandler() {
      config.timerCount = 0;
      reconnectionHandler();
    }

    function closeHandler(e) {
      if (config.timerCount === 0) {
        if (e.code === 1006) initWebSocket();
      } else {
        clearInterval(config.timerID);
        config.timerID = setTimeout(() => {
          if (e.code === 1006) initWebSocket();
        }, 30000);
      }
    }

    function reconnectionHandler() {
      if (ws.readyState === WebSocket.CONNECTING) {
        clearTimeout(wsTimerID);
        wsTimerID = setTimeout(() => {
          reconnectionHandler();
        }, 300);
        return;
      }
      if (ws.readyState !== WebSocket.OPEN) {
        initWebSocket();
      }
    }

    function messageHandler({ data }) {
      setMessages((prevState) => [
        ...prevState,
        { message: data, isShow: false },
      ]);
    }

    initWebSocket();
    return () => {
      if (ws !== null) {
        ws.close();
        ws = null;
      }
      config.timerCount = 0;
      clearTimeout(config.timerID);
      clearTimeout(wsTimerID);
    };
  }, [onAdd, config]);
  return {
    ws,
    messages,
    submitHandler,
    shownMessageHandler,
  };
};

export default useChatSocketApi;
