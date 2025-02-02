import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { logout } from '../../redux/slices/auth/authSlice.ts';

export const Menu = () => {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <header className="flex items-center justify-around py-4">
      <div className="text-yellow-600 font-bold text-3xl">ReactDemo</div>
      <nav className="flex gap-5 text-2xl ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'text-yellow-300' : '')}
        >
          Home
        </NavLink>
        {isAuth ? (
          <>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? 'text-yellow-300' : '')}
            >
              Users
            </NavLink>
            <NavLink
              to="/recipes"
              className={({ isActive }) => (isActive ? 'text-yellow-300' : '')}
            >
              Recipes
            </NavLink>
          </>
        ) : (
          ''
        )}
      </nav>
      {isAuth ? (
        <>
          <div className="flex items-center gap-5">
            <img src={user?.image} alt={user?.username} width={50} />
            <p>{user?.username}</p>
          </div>
          <button
            className="bg-yellow-300 px-4 py-2 rounded-2xl text-black hover:bg-yellow-600"
            onClick={handleLogOut}
          >
            LogOut
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="bg-yellow-300 px-4 py-2 rounded-2xl text-black hover:bg-yellow-600"
        >
          Login
        </Link>
      )}
    </header>
  );
};
