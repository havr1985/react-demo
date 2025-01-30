import { FC } from 'react';
import { IUser } from '../../../models/user/user.model.ts';

type PropsType = {
  user: IUser;
};

export const UserItem: FC<PropsType> = ({ user }) => {
  return (
    <div>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>{user.email}</p>
    </div>
  );
};
