import {
  useDeleteCharacterDeathApi,
  useGetCharacterApi,
  useUpdateCharacterAttributesApi,
} from 'apis/useCharacterApi';
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import MessageContext from './messageContext';

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
  // const navigate = useNavigate();
  // const { authTokenApi } = useAuthTokenApi();
  const { updateCharacterAttributesApi } =
    useUpdateCharacterAttributesApi();
  const { deleteCharacterDeathApi } =
    useDeleteCharacterDeathApi();
  const [character, setCharacter] = useState();
  const { getCharacterApi, data, clear } =
    useGetCharacterApi();
  const { onAdd } = useContext(MessageContext);

  const updateCharacterAttributesHandler = useCallback(
    async (satiety = 2, mood = 1) => {
      const { attributes } = character;

      await updateCharacterAttributesApi(character._id, {
        satiety: attributes.satiety - satiety,
        mood: attributes.mood - mood,
      });
      await getCharacterApi();
    },
    [
      character,
      updateCharacterAttributesApi,
      getCharacterApi,
    ],
  );

  const loginHandler = useCallback((_token) => {
    if (_token) {
      localStorage.setItem('authorization', _token);
    }
    const token = localStorage.getItem('authorization');
    if (token) setIsAuth(true);
  }, []);

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

  useEffect(() => {
    if (!character) return;
    if (character.attributes.satiety > 0) return;
    // Character death
    deleteCharacterDeathApi(character._id).then(() => {
      onAdd('info', '角色飢餓過久已死亡復活');
      getCharacterApi();
    });
  }, [
    onAdd,
    character,
    deleteCharacterDeathApi,
    getCharacterApi,
  ]);

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
