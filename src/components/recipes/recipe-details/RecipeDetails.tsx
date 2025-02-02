import { Link, useParams } from 'react-router-dom';
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
        <div className="flex gap-5 border border-yellow-300 px-2 py-4 rounded-lg">
          <img
            src={recipe.image}
            alt={recipe.name}
            width={500}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-6">
            <div className="flex justify-around items-center mb-4">
              <h2 className="text-yellow-600 text-4xl font-bold">
                {recipe.name}
              </h2>
              <p className="text-4xl text-yellow-300">★ {recipe.rating}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-2xl text-yellow-300">Instructions:</p>
              <p className="text-xl">{recipe.instructions}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-2xl text-yellow-300">Ingredients:</p>
              <p className="text-xl">{recipe.ingredients}</p>
            </div>
            <div className="flex gap-5 items-center">
              <p className="text-2xl text-yellow-300">Author: </p>
              <Link
                to={`/user/${author?.id}`}
                className="bg-yellow-300 text-black text-xl px-2 py-1 rounded-lg hover:bg-yellow-100"
              >
                {author?.firstName} {author?.lastName}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
