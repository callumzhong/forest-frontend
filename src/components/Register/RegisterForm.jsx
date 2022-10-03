import Button from 'modules/Button';
import Input from 'modules/Input';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const RegisterForm = ({ onSubmit, schema, isLoading }) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      account: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const submitHandler = (data) => {
    onSubmit(data);
  };
  const watched = watch();

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className='mb-6 text-right'
    >
      <Input
        label='帳號'
        maxLength={12}
        type='text'
        basis={8}
        error={errors.account?.message}
        {...register('account')}
      />
      <Input
        maxLength={12}
        label='密碼'
        type='password'
        basis={8}
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        maxLength={12}
        label='確定密碼'
        type='password'
        basis={8}
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Input
        label='信箱'
        type='text'
        basis={8}
        error={errors.email?.message}
        {...register('email')}
      />
      <Button
        disabled={
          Object.values(watched).some((item) => !item) ||
          isLoading
        }
        type='submit'
      >
        提交
      </Button>
    </form>
  );
};

export default RegisterForm;
