import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMe, loginUser } from '../../../api/api.service.ts';
import { authStorage } from '../../../utils/authStorage.ts';

type loginData = {
  username: string;
  password: string;
};
export const login = createAsyncThunk(
  'auth/login',
  async (formValue: loginData, { rejectWithValue }) => {
    try {
      const data = await loginUser(formValue);
      authStorage.setTokens(data.accessToken, data.refreshToken);
      return {
        user: {
          id: data.id,
          username: data.username,
          image: data.image,
        },
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue('Invalid credential');
    }
  }
);

export const getMeThunk = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMe();
      return {
        user: {
          id: data.id,
          username: data.username,
          image: data.image,
        },
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to get user data');
    }
  }
);
