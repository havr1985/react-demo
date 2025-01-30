import { UsersList } from '../components/users/users-list/UsersList.tsx';
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';

import { useEffect } from 'react';
import { getAllUsersThunk } from '../redux/slices/users/usersThunks.ts';

const UsersPage = () => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsersThunk());
    }
  }, [dispatch, users.length]);
  return (
    <div>
      <UsersList />
    </div>
  );
};

export default UsersPage;
