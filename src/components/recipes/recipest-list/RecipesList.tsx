import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { Pagination } from '../../pagination/Pagination.tsx';
import { RecipeItem } from '../recipe-item/RecipeItem.tsx';
import { setCurrentPage } from '../../../redux/slices/recipes/recipesSlice.ts';
import { NavLink } from 'react-router-dom';

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
                <NavLink to={`/recipe/${recipe.id}`} key={recipe.id}>
                  <li>
                    <RecipeItem recipe={recipe} />
                  </li>
                </NavLink>
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
