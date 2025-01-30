import axios from 'axios';
import { store } from '../redux/store.ts';
import { refreshTokenThunk } from '../redux/slices/auth/authThunks.ts';
import { logout } from '../redux/slices/auth/authSlice.ts';

export const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        await store.dispatch(refreshTokenThunk());
        const newState = store.getState();
        originalReq.headers.Authorization = `Bearer ${newState.auth.accessToken}`;
        return axiosInstance(originalReq);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
