import {
  useDeleteCharacterDeathApi,
  useGetCharacterApi,
  useUpdateCharacterAttributesApi
} from 'apis/useCharacterApi';
import React, {
  useCallback,
  useContext,
  useEffect
} from 'react';
import MessageContext from './messageContext';

const AuthContext = React.createContext({
  character: {},
  onLogout: () => {},
  onGetCharacter: async () => {},
  onUpdateCharacter: async () => {},
});

export const AuthContextProvider = (props) => {
  const { updateCharacterAttributesApi } =
    useUpdateCharacterAttributesApi();
  const { deleteCharacterDeathApi } =
    useDeleteCharacterDeathApi();
  const {
    getCharacterApi,
    data: character,
    clear,
  } = useGetCharacterApi();
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
        character: character,
        onLogout: clear,
        onGetCharacter: getCharacterApi,
        onUpdateCharacter: updateCharacterAttributesHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
