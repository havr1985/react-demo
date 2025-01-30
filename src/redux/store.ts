import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice.ts';
import usersReducer from './slices/users/usersSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
