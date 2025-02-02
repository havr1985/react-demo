import { createSlice } from '@reduxjs/toolkit';
import { getMeThunk, login } from './authThunks.ts';
import { IAuthUser } from '../../../models/auth/authResponse.model.ts';
import { authStorage } from '../../../utils/authStorage.ts';

export interface AuthState {
  user: IAuthUser | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
}

export const initialState: AuthState = {
  user: null,
  accessToken: authStorage.getAccessToken() || null,
  loading: false,
  error: null,
  isAuth: !!authStorage.getAccessToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      authStorage.clearTokens();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(getMeThunk.rejected, (state) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuth = true;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
