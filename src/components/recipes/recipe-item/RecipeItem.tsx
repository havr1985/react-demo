import { IRecipe } from '../../../models/recipe/recipe.model.ts';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks.ts';
import { setFilterTag } from '../../../redux/slices/recipes/recipesSlice.ts';

type PropsType = {
  recipe: IRecipe;
};

export const RecipeItem: FC<PropsType> = ({ recipe }) => {
  const dispatch = useAppDispatch();

  return (
    <div className=" w-[400px] flex flex-col gap-3 px-2 py-4 border border-yellow-300 rounded-lg ">
      <Link
        to={`/recipe/${recipe.id}`}
        className="text-yellow-600 text-2xl cursor-pointer hover:text-gray-300"
      >
        {recipe.name}
      </Link>
      <ul className="flex flex-wrap gap-3">
        {recipe.tags.map((tag) => (
          <li
            key={tag}
            onClick={() => dispatch(setFilterTag(tag))}
            className=" bg-yellow-300 text-black px-2 py-1 rounded-lg hover:bg-yellow-100 cursor-pointer"
          >
            <p># {tag}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
