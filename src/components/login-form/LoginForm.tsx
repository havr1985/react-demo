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
  const { user, loading } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<loginData>({ mode: 'onBlur' });

  if (user) {
    return <Navigate to="/" />;
  }
  const loginHandler = async (formValue: loginData) => {
    try {
      console.log(formValue);
      await dispatch(login(formValue));
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(loginHandler)}>
        <label>
          Username
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
            value="emilys"
          />
          <p>{errors.username?.message}</p>
        </label>
        <label>
          Password
          <input
            type="text"
            {...register('password', { required: 'Password is required' })}
            value="emilyspass"
          />
          <p>{errors.password?.message}</p>
        </label>
        <button disabled={!isValid || loading}>Login</button>
      </form>
    </div>
  );
};
