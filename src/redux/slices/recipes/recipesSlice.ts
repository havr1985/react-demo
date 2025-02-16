import { IRecipe } from '../../../models/recipe/recipe.model.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllRecipesThunk } from './recipesThunks.ts';

export interface IRecipesState {
  recipes: IRecipe[];
  recipesPerPage: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  filterTag: string | null;
}

const initialState: IRecipesState = {
  recipes: [],
  recipesPerPage: 10,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  filterTag: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = Math.ceil(action.payload / state.recipesPerPage);
    },
    setFilterTag: (state, action: PayloadAction<string | null>) => {
      state.filterTag = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllRecipesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRecipesThunk.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.totalPages = Math.ceil(
          action.payload.recipes.length / state.recipesPerPage
        );
        state.loading = false;
      })
      .addCase(getAllRecipesThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      }),
});

export const { setCurrentPage, setTotalPages, setFilterTag } =
  recipesSlice.actions;
export default recipesSlice.reducer;
