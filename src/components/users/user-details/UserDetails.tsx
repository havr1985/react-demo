import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { useEffect } from 'react';
import { getAllUsersThunk } from '../../../redux/slices/users/usersThunks.ts';

export const UserDetails = () => {
  const { id } = useParams();
  const userId = Number(id);
  const dispatch = useAppDispatch();

  const { users, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (!users.length) {
      dispatch(getAllUsersThunk());
    }
  }, [users.length, dispatch]);

  const user = users.find((user) => user.id === userId);
  return (
    <>
      {loading || (!user && <div>Loading...</div>)}
      {!loading && user && <div>{user.firstName}</div>}
    </>
  );
};
