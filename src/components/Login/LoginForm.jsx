import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'modules/Button';
import Input from 'modules/Input';
import { useForm } from 'react-hook-form';

const LoginForm = ({ schema, onSubmit, isLoading }) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      account: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const watched = watch();
  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mb-6 text-right'
    >
      <Input
        error={errors.account?.message}
        label='帳號'
        maxLength={12}
        basis={8}
        {...register('account')}
      />
      <Input
        label='密碼'
        maxLength={12}
        error={errors.password?.message}
        type='password'
        basis={8}
        {...register('password')}
      />
      <Button
        disabled={
          Object.values(watched).some((item) => !item) ||
          isLoading
        }
        type='submit'
      >
        LOGIN
      </Button>
    </form>
  );
};

export default LoginForm;
