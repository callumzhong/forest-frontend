import {
  useGetCharacterApi,
  useUpdateCharacterAttributesApi,
} from "apis/useCharacterApi";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

const AuthContext = React.createContext({
  isLoading: false,
  character: {},
  onClear: () => {},
  onGetCharacter: async () => {},
  onUpdateCharacter: async () => {},
});

export const AuthContextProvider = (props) => {
  const [character, setCharacter] = useState();
  const { updateCharacterAttributesApi } =
    useUpdateCharacterAttributesApi();
  const {
    isLoading,
    getCharacterApi,
    data: characterData,
  } = useGetCharacterApi();

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
  const clearCharacterHandler = useCallback(() => {
    setCharacter();
  }, []);

  useEffect(() => {
    if (characterData) setCharacter(characterData);
  }, [characterData]);

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        character: character,
        onClear: clearCharacterHandler,
        onGetCharacter: getCharacterApi,
        onUpdateCharacter: updateCharacterAttributesHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
