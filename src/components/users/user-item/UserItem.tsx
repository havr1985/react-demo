import { FC } from 'react';
import { IUser } from '../../../models/user/user.model.ts';

type PropsType = {
  user: IUser;
};

export const UserItem: FC<PropsType> = ({ user }) => {
  return (
    <div className=" w-[400px] flex gap-3 px-2 py-4 border border-yellow-300 rounded-lg hover:bg-yellow-50">
      <img src={user.image} alt={user.firstName} width={54} />
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-yellow-300">
          {user.firstName} {user.lastName}
        </h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
};
