import { UsersList } from '../components/users/users-list/UsersList.tsx';
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';

import { useEffect } from 'react';
import { getAllUsersThunk } from '../redux/slices/users/usersThunks.ts';

const UsersPage = () => {
  const { users, loading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsersThunk());
    }
  }, [dispatch, users.length]);
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {!loading && !error && (
        <section className="my-5">
          <UsersList />
        </section>
      )}
    </>
  );
};

export default UsersPage;
