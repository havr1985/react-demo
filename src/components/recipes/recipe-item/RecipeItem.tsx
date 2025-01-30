import { IRecipe } from '../../../models/recipe/recipe.model.ts';
import { FC } from 'react';

type PropsType = {
  recipe: IRecipe;
};

export const RecipeItem: FC<PropsType> = ({ recipe }) => {
  return (
    <div>
      <h2>{recipe.name}</h2>
      <ul>
        {recipe.tags.map((tag) => (
          <li key={tag}>
            <p>{tag}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
