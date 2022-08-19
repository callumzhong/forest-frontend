import useHttp from 'hooks/useHttp';
import { useCallback, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from 'store/authContext';
import MessageContext from 'store/messageContext';
import * as yup from 'yup';

const schema = yup
  .object({
    account: yup
      .string()
      .min(4, '至少 4 個字元')
      .max(12, '最多限制12字元')
      .required('必填'),
    password: yup
      .string()
      .min(8, '至少 8 個字元')
      .required('必填'),
  })
  .required();
const useLoginApi = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const { onAdd } = useContext(MessageContext);
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.form?.pathname || '/';
  const loginApi = useCallback(
    (body) => {
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/user/sign_in`,
        method: 'POST',
        body: JSON.stringify(body),
      })
        .then((data) => {
          authCtx.onLogin(data.token);
          navigate(from, { replace: true });
        })
        .catch((error) => {
          if (!error.code) {
            onAdd(
              'error',
              '伺服器正在喚醒，請稍後再試',
              1200,
            );
            return;
          }
          onAdd('error', error.message, 1200);
        });
    },
    [sendRequest, onAdd, navigate, from, authCtx],
  );
  return {
    isLoading,
    error,
    loginApi,
  };
};

export { schema };
export default useLoginApi;
