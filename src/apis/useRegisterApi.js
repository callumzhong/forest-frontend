import useHttp from 'hooks/useHttp';
import { useCallback, useContext, useEffect } from 'react';
import AuthContext from 'store/authContext';
import MessageContext from 'store/messageContext';
import * as yup from 'yup';

const schema = yup
  .object({
    password: yup
      .string()
      .min(8, '至少 8 個字元')
      .required('必填'),
    email: yup
      .string()
      .email('信箱格式錯誤')
      .required('必填'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], '與密碼不一致')
      .required('必填'),
    account: yup
      .string()
      .min(4, '至少 4 個字元')
      .max(12, '最多限制12字元')
      .required('必填'),
  })
  .required();

const useRegisterApi = () => {
  const { onAdd } = useContext(MessageContext);
  const { onLogin } = useContext(AuthContext);
  const { isLoading, data, error, sendRequest } = useHttp();
  const registerApi = useCallback(
    (body) =>
      sendRequest({
        url: `${process.env.REACT_APP_API_SERVER}/api/user/sign_up`,
        method: 'POST',
        body: JSON.stringify(body),
      }),
    [sendRequest],
  );

  useEffect(() => {
    if (data) {
      onAdd('success', '註冊成功', 1200);
      onLogin(data.token);
    }
  }, [data, onAdd, onLogin]);

  useEffect(() => {
    if (error) {
      onAdd('error', error.message, 1200);
    }
  }, [error, onAdd]);

  return {
    data,
    isLoading,
    error,
    registerApi,
  };
};
export { schema };
export default useRegisterApi;
