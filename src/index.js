import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from 'store/authContext';
import { MessageContextProvider } from 'store/messageContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root'),
);
root.render(
  // <React.StrictMode>
  <BrowserRouter >
    <MessageContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MessageContextProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
