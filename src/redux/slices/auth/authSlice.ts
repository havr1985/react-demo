import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from './authThunks.ts';
import {
  IAuthResponse,
  IAuthUser,
} from '../../../models/auth/authResponse.model.ts';

interface AuthState {
  user: IAuthUser | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<IAuthResponse>) => {
        state.user = action.payload.user;
      }
    );
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
