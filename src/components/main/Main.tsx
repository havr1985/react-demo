import { useAppSelector } from '../../redux/hooks.ts';
import { Link } from 'react-router-dom';

export const Main = () => {
  const { isAuth, loading } = useAppSelector((state) => state.auth);

  return (
    <>
      {loading && <div>Loading..</div>}
      {!loading && !isAuth && (
        <div className="flex flex-col gap-12 items-center">
          <h1 className="text-yellow-300 text-6xl">Welcome React Demo!</h1>
          <p className="text-gray-500 text-center text-4xl">Please login</p>
          <Link
            to="/login"
            className=" w-64 border border-yellow-300 flex flex-col py-4 px-8 rounded-lg
            text-center text-2xl hover:bg-yellow-300 hover:text-black"
          >
            Login
          </Link>
        </div>
      )}
      {!loading && isAuth && (
        <div className="flex flex-col gap-12 items-center">
          <div className="text-yellow-300 text-6xl">Congratulate!!!</div>
          <p className="text-gray-500 text-center text-4xl">
            You have successfully logged in
          </p>
          <p className="text-yellow-600 font-bold text-3xl">React Demo</p>
        </div>
      )}
    </>
  );
};
