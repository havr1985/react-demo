import { useForm } from 'react-hook-form';
import { login } from '../../redux/slices/auth/authThunks.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { Navigate } from 'react-router-dom';

export const LoginForm = () => {
  type loginData = {
    username: string;
    password: string;
  };

  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<loginData>({ mode: 'onBlur' });

  if (isAuth) {
    return <Navigate to="/" />;
  }
  const loginHandler = async (formValue: loginData) => {
    try {
      await dispatch(login(formValue));
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="border-4 border-yellow-300 flex flex-col py-8 px-16 gap-5 rounded-lg"
      >
        <label className="flex flex-col gap-3 text-2xl text-gray-300">
          Username
          <input
            className="h-10 rounded-lg px-4 text-black"
            type="text"
            {...register('username', { required: 'Username is required' })}
            placeholder="emilys"
          />
          <p className="text-red-500 text-xs">{errors.username?.message}</p>
        </label>
        <label className="flex flex-col gap-3 text-2xl text-gray-300">
          Password
          <input
            className="h-10 rounded-lg px-4 text-black"
            type="text"
            {...register('password', { required: 'Password is required' })}
            placeholder="emilyspass"
          />
          <p className="text-red-500 text-xs">{errors.password?.message}</p>
        </label>
        <button
          disabled={!isValid}
          className="bg-yellow-300 px-4 py-2 rounded-2xl text-black hover:bg-yellow-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};
