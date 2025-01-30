import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRecipes } from '../../../api/api.service.ts';

export const getAllRecipesThunk = createAsyncThunk(
  'recipes/getAllRecipes',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllRecipes();
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to load recipes!');
    }
  }
);
