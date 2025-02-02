import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { useEffect } from 'react';
import { getAllUsersThunk } from '../../../redux/slices/users/usersThunks.ts';
import { getAllRecipesThunk } from '../../../redux/slices/recipes/recipesThunks.ts';

export const UserDetails = () => {
  const { id } = useParams();
  const userId = Number(id);
  const dispatch = useAppDispatch();

  const { users, loading } = useAppSelector((state) => state.users);
  const { recipes } = useAppSelector((state) => state.recipes);

  useEffect(() => {
    if (!users.length) {
      dispatch(getAllUsersThunk());
    }
    if (!recipes.length) {
      dispatch(getAllRecipesThunk());
    }
  }, [users.length, dispatch, recipes.length]);

  const user = users.find((user) => user.id === userId);
  const userRecipes = recipes.filter((recipe) => recipe.userId === user?.id);

  return (
    <>
      {loading || (!user && <div>Loading...</div>)}
      {!loading && user && (
        <div className="flex flex-col gap-5 border border-yellow-300 px-4 py-8 rounded-lg">
          <h2 className="text-yellow-600 text-4xl text-center">Profile</h2>
          <div className="flex gap-5 items-center">
            <img src={user.image} alt={user.firstName} width={200} />
            <div className="flex flex-col gap-1">
              <p className="text-yellow-300 font-bold">
                {user.firstName} {user.lastName}
              </p>
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
              <p>Birth day: {user.birthDate}</p>
              <div className="mt-2">
                <p className="text-yellow-600 text-2xl">Address:</p>
                <p>{user.address.address}</p>
                <p>{user.address.city}</p>
                <p>{user.address.country}</p>
              </div>
            </div>
          </div>
          {userRecipes.length ? (
            <ul className="text-yellow-600 text-2xl flex gap-3 flex-wrap items-center">
              Recipes:
              {userRecipes.map((recipe) => (
                <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                  <li className="bg-yellow-300 text-black px-2 py-1 rounded-lg hover:bg-yellow-100">
                    <p>{recipe.name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="text-yellow-600 text-2xl">No recipes</div>
          )}
        </div>
      )}
    </>
  );
};
