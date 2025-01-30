export interface IRecipesResponse {
  recipes: IRecipe[];
  total: number;
  skip: number;
  limit: number;
}

export interface IRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  userId: number;
  image: string;
  rating: number;
}
