import './App.css';
import { Routes } from './routes/routes.tsx';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { useEffect } from 'react';
import { getMeThunk } from './redux/slices/auth/authThunks.ts';

console.log('APP Started');

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user && isAuth) {
      dispatch(getMeThunk());
    }
  }, [dispatch, user]);
  return (
    <>
      <div>
        <Routes />
      </div>
    </>
  );
}

export default App;
