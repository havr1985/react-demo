import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { useEffect } from 'react';
import { getAllRecipesThunk } from '../../../redux/slices/recipes/recipesThunks.ts';
import { getAllUsersThunk } from '../../../redux/slices/users/usersThunks.ts';

export const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const dispatch = useAppDispatch();

  const { recipes, loading, error } = useAppSelector((state) => state.recipes);
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (!recipes.length) {
      dispatch(getAllRecipesThunk());
    }
    if (!users.length) {
      dispatch(getAllUsersThunk());
    }
  }, [dispatch, recipes.length, users.length]);

  const recipe = recipes.find((recipe) => recipe.id === recipeId);
  const author = users.find((user) => user.id === recipe?.userId);

  return (
    <div>
      {loading || (!recipe && <div>Loading</div>)}
      {error && <div>Error! Try again</div>}
      {!loading && !error && recipe && (
        <div>
          <h2>{recipe.name}</h2>
          <NavLink to={`/user/${author?.id}`}>{author?.firstName}</NavLink>
        </div>
      )}
    </div>
  );
};
