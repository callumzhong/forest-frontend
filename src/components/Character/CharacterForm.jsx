import { yupResolver } from "@hookform/resolvers/yup";
import {
  createCharacterSchema,
  useCreateCharacterApi,
} from "apis/useCharacterApi";
import Button from "modules/Button";
import Input from "modules/Input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CharacterForm = ({ onLogout, onGetCharacter }) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(createCharacterSchema),
  });
  const { createCharacterApi, data, isLoading } =
    useCreateCharacterApi();
  const onSubmit = (data) => createCharacterApi(data);
  const watched = watch();

  useEffect(() => {
    if (data) {
      onGetCharacter();
    }
  }, [data, onGetCharacter]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 text-right"
    >
      <Input
        error={errors.name?.message}
        label="名稱"
        maxLength={12}
        basis={8}
        {...register("name")}
      />
      <div className="mt-6 flex justify-end gap-4">
        <Button
          disabled={
            Object.values(watched).some((item) => !item) ||
            isLoading
          }
          type="submit"
        >
          建立
        </Button>
        <Button onClick={onLogout}>登出</Button>
      </div>
    </form>
  );
};

export default CharacterForm;
