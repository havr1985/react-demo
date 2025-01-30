import { useAppSelector } from '../../../redux/hooks.ts';

import { UserItem } from '../user-item/UserItem.tsx';

export const UsersList = () => {
  const { users } = useAppSelector((state) => state.users);

  console.log(users);

  return (
    <div>
      {users.length && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <UserItem user={user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
