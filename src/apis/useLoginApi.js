import useHttp from 'hooks/useHttp';
import { useContext, useEffect } from 'react';
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

const useLoginApi = ({ onEnableAuthenticate }) => {
  const { isLoading, error, code, data, sendRequest } =
    useHttp();
  const { onAdd } = useContext(MessageContext);
  const loginApi = (body) =>
    sendRequest({
      url: `${process.env.REACT_APP_API_SERVER}/api/user/sign_in`,
      method: 'POST',
      body: JSON.stringify(body),
    });

  useEffect(() => {
    if (data) {
      onEnableAuthenticate(data.token);
    }
  }, [data, onEnableAuthenticate]);

  useEffect(() => {
    if (!error) return;
    if (!code) {
      onAdd('error', '伺服器正在喚醒，請稍後再試', 1200);
      return;
    }
    onAdd('error', error, 1200);
  }, [error, code, onAdd]);

  return {
    isLoading,
    error,
    data,
    loginApi,
  };
};

export { schema };
export default useLoginApi;
