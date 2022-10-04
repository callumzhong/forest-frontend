import useAuthTokenApi from 'apis/useAuthTokenApi';
import {
  useGetCharacterApi,
  useUpdateCharacterAttributesApi,
} from 'apis/useCharacterApi';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

const AuthContext = React.createContext({
  isAuth: false,
  character: {},
  onLogin: async () => {},
  onLogout: () => {},
  onGetCharacter: async () => {},
  onUpdateCharacter: async () => {},
});

export const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const { authTokenApi } = useAuthTokenApi();
  const { updateCharacterAttributesApi } =
    useUpdateCharacterAttributesApi();
  const [character, setCharacter] = useState();
  const { getCharacterApi, data, clear } =
    useGetCharacterApi();

  const updateCharacterAttributesHandler =
    useCallback(async () => {
      const { attributes } = character;

      await updateCharacterAttributesApi(character._id, {
        satiety: attributes.satiety - 2,
        mood: attributes.mood - 1,
      });
      await getCharacterApi();
    }, [
      character,
      updateCharacterAttributesApi,
      getCharacterApi,
    ]);

  const loginHandler = useCallback(
    (_token) => {
      if (_token) {
        localStorage.setItem('authorization', _token);
      }
      return authTokenApi().then(() => {
        setIsAuth(true);
      });
    },
    [authTokenApi],
  );

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('authorization');
    clear();
    setIsAuth(false);
  }, [clear]);

  useEffect(() => {
    if (data) {
      setCharacter(data);
    }
  }, [data]);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        character: character,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onGetCharacter: getCharacterApi,
        onUpdateCharacter: updateCharacterAttributesHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
