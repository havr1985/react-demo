import { NavLink, useParams } from 'react-router-dom';
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

  console.log(userRecipes);
  return (
    <>
      {loading || (!user && <div>Loading...</div>)}
      {!loading && user && (
        <div>
          <div>{user.firstName}</div>
          {userRecipes.length ? (
            <ul>
              {userRecipes.map((recipe) => (
                <NavLink to={`/recipe/${recipe.id}`} key={recipe.id}>
                  <li>
                    <p>{recipe.name}</p>
                  </li>
                </NavLink>
              ))}
            </ul>
          ) : (
            <div>No recipes</div>
          )}
        </div>
      )}
    </>
  );
};
