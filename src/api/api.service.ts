import { axiosInstance } from './axiosInstance.ts';
import { IAuthResponse } from '../models/auth/authResponse.model.ts';
import { IUserResponse } from '../models/user/user.model.ts';

interface LoginData {
  username: string;
  password: string;
}

export const loginUser = async (data: LoginData): Promise<IAuthResponse> => {
  const res = await axiosInstance.post('auth/login', data);
  return res.data;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const res = await axiosInstance.post('auth/refresh', refreshToken);
  return res.data;
};

export const getAllUsers = async (): Promise<IUserResponse> => {
  const res = await axiosInstance.get(`users?limit=0`);
  return res.data;
};
