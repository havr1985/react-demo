import axios from 'axios';
import { authStorage } from '../utils/authStorage.ts';
import { refreshAccessToken } from './api.service.ts';

export const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authStorage.getAccessToken();
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
        const oldRefreshToken = authStorage.getRefreshToken();
        if (!oldRefreshToken) {
          throw new Error('No refresh token');
        }

        const { accessToken, refreshToken } =
          await refreshAccessToken(oldRefreshToken);
        authStorage.setTokens(accessToken, refreshToken);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalReq.headers.Authorization = `Bearer ${accessToken}`;
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
