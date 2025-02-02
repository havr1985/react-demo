import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';

import { UserItem } from '../user-item/UserItem.tsx';
import { Pagination } from '../../pagination/Pagination.tsx';
import {
  setCurrentPage,
  setTotalPages,
} from '../../../redux/slices/users/usersSlice.ts';
import { NavLink } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { SearchBar } from '../../search-bar/SearchBar.tsx';

export const UsersList = () => {
  const { users, currentPage, totalPages, usersPerPage } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter((user) =>
      `${user.firstName}${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  useEffect(() => {
    dispatch(setTotalPages(filteredUsers.length));
  }, [dispatch, filteredUsers.length]);

  const handleReset = () => {
    setSearchQuery('');
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <SearchBar
        value={searchQuery}
        onSearch={(query) => {
          setSearchQuery(query);
          dispatch(setCurrentPage(1));
        }}
        onReset={handleReset}
        placeholder="Find users"
      />
      {filteredUsers.length > 0 ? (
        <>
          <ul className="flex flex-wrap justify-center gap-5">
            {filteredUsers
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
          <div className="text-center">
            <Pagination
              currentPage={currentPage}
              totalPage={totalPages}
              onPageChange={(page) => dispatch(setCurrentPage(page))}
            />
          </div>
        </>
      ) : (
        <div>Users not Found</div>
      )}
    </div>
  );
};
