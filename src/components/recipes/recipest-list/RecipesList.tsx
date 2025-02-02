import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { Pagination } from '../../pagination/Pagination.tsx';
import { RecipeItem } from '../recipe-item/RecipeItem.tsx';
import {
  setCurrentPage,
  setFilterTag,
  setTotalPages,
} from '../../../redux/slices/recipes/recipesSlice.ts';
import { useEffect, useMemo, useState } from 'react';
import { SearchBar } from '../../search-bar/SearchBar.tsx';

export const RecipesList = () => {
  const { recipes, currentPage, totalPages, recipesPerPage, filterTag } =
    useAppSelector((state) => state.recipes);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;
    if (filterTag) {
      filtered = filtered.filter((recipe) => recipe.tags.includes(filterTag));
    }

    if (searchQuery) {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [recipes, filterTag, searchQuery]);

  useEffect(() => {
    dispatch(setTotalPages(filteredRecipes.length));
  }, [dispatch, filteredRecipes.length]);

  const handleReset = () => {
    setSearchQuery('');
    dispatch(setFilterTag(null));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <SearchBar
        value={searchQuery}
        onSearch={(query) => {
          setSearchQuery(query);
          dispatch(setCurrentPage(1));
        }}
        onReset={handleReset}
        placeholder="Find recipes"
      />
      {filteredRecipes.length > 0 ? (
        <>
          <ul className="flex flex-wrap justify-center gap-5 mb-20">
            {filteredRecipes
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
      ) : (
        <div>Recipes not found</div>
      )}
    </div>
  );
};
