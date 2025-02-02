import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';
import { useEffect } from 'react';
import { getAllRecipesThunk } from '../redux/slices/recipes/recipesThunks.ts';
import { RecipesList } from '../components/recipes/recipest-list/RecipesList.tsx';

const RecipesPage = () => {
  const { recipes, loading, error } = useAppSelector((store) => store.recipes);
  const dispatch = useAppDispatch();
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
        <section className="mt-5">
          <RecipesList />
        </section>
      )}
    </>
  );
};

export default RecipesPage;
