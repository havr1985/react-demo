import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './slices/auth/authSlice.ts';
import usersReducer, { IUsersState } from './slices/users/usersSlice.ts';
import recipesReducer, {
  IRecipesState,
} from './slices/recipes/recipesSlice.ts';

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/lib/persistReducer';
import { authTransform } from './transforms/authTransform.ts';

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  recipes: recipesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [authTransform],
};

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;

export type RootState = {
  auth: AuthState;
  users: IUsersState;
  recipes: IRecipesState;
} & PersistPartial;
export type AppDispatch = typeof store.dispatch;
