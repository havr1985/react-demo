import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';
import { useEffect } from 'react';
import { getAllRecipesThunk } from '../redux/slices/recipes/recipesThunks.ts';
import { RecipesList } from '../components/recipes/recipest-list/RecipesList.tsx';

const RecipesPage = () => {
  const { recipes, loading, error } = useAppSelector((store) => store.recipes);
  const dispatch = useAppDispatch();
  console.log(recipes);
  useEffect(() => {
    if (!recipes.length) {
      dispatch(getAllRecipesThunk());
    }
  }, [recipes.length, dispatch]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {!loading && !error && (
        <div>
          <RecipesList />
        </div>
      )}
    </>
  );
};

export default RecipesPage;
