import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { Pagination } from '../../pagination/Pagination.tsx';
import { RecipeItem } from '../recipe-item/RecipeItem.tsx';
import { setCurrentPage } from '../../../redux/slices/recipes/recipesSlice.ts';

export const RecipesList = () => {
  const { recipes, currentPage, totalPages, recipesPerPage } = useAppSelector(
    (state) => state.recipes
  );
  const dispatch = useAppDispatch();
  return (
    <div>
      {recipes.length && (
        <>
          <ul>
            {recipes
              .slice(
                (currentPage - 1) * recipesPerPage,
                currentPage * recipesPerPage
              )
              .map((recipe) => (
                <li key={recipe.id}>
                  <RecipeItem recipe={recipe} />
                </li>
              ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </>
      )}
    </div>
  );
};
