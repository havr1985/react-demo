import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from '../../../api/api.service.ts';

export const getAllUsersThunk = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllUsers();
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to load user');
    }
  }
);
