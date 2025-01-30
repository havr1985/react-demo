import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';

import { UserItem } from '../user-item/UserItem.tsx';
import { Pagination } from '../../pagination/Pagination.tsx';
import { setCurrentPage } from '../../../redux/slices/users/usersSlice.ts';
import { NavLink } from 'react-router-dom';

export const UsersList = () => {
  const { users, currentPage, totalPages, usersPerPage } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();

  return (
    <div>
      {users.length && (
        <>
          <ul>
            {users
              .slice(
                (currentPage - 1) * usersPerPage,
                currentPage * usersPerPage
              )
              .map((user) => (
                <NavLink to={`/user/${user.id}`} key={user.id}>
                  <li>
                    <UserItem user={user} />
                  </li>
                </NavLink>
              ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </>
      )}
    </div>
  );
};
