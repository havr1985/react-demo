import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, refreshAccessToken } from '../../../api/api.service.ts';
import { setToken } from './authSlice.ts';
import { store } from '../../store.ts';

type loginData = {
  username: string;
  password: string;
};
export const login = createAsyncThunk(
  'auth/login',
  async (formValue: loginData, { rejectWithValue }) => {
    try {
      const data = await loginUser(formValue);
      store.dispatch(
        setToken({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Invalid credential');
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return rejectWithValue('No refresh token available');
    }
    try {
      const data = await refreshAccessToken(refreshToken);
      store.dispatch(
        setToken({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Error to refresh token');
    }
  }
);
