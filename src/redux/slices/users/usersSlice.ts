import { IUser } from '../../../models/user/user.model.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllUsersThunk } from './usersThunks.ts';

export interface IUsersState {
  users: IUser[];
  usersPerPage: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: IUsersState = {
  users: [],
  usersPerPage: 20,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = Math.ceil(action.payload / state.usersPerPage);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.totalPages = Math.ceil(
          action.payload.users.length / state.usersPerPage
        );
        state.loading = false;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      }),
});

export const { setCurrentPage, setTotalPages } = usersSlice.actions;
export default usersSlice.reducer;
