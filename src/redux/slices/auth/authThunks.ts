import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMe,
  loginUser,
  refreshAccessToken,
} from '../../../api/api.service.ts';
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

export const refreshTokenThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    const refreshToken = authStorage.getRefreshToken();
    if (!refreshToken) {
      return rejectWithValue('No refresh token available');
    }
    try {
      const data = await refreshAccessToken(refreshToken);
      authStorage.setTokens(data.accessToken, data.refreshToken);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Error to refresh token');
    }
  }
);
