import { JSX } from 'react';
import { useAppSelector } from '../redux/hooks.ts';
import { Navigate } from 'react-router-dom';

type PropsType = {
  children: JSX.Element;
};

export const PrivateRote = ({ children }: PropsType) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  return isAuth ? children : <Navigate to="/" />;
};
