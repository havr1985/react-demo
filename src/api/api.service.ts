import { axiosInstance } from './axiosInstance.ts';
import { IAuthResponse } from '../models/auth/authResponse.model.ts';
import { IUserResponse } from '../models/user/user.model.ts';
import { IRecipesResponse } from '../models/recipe/recipe.model.ts';

interface LoginData {
  username: string;
  password: string;
  expiresInMins?: number;
}

export const loginUser = async (data: LoginData): Promise<IAuthResponse> => {
  const payload = { ...data, expiresInMins: 2 };
  const res = await axiosInstance.post('auth/login', payload);
  return res.data;
};

export const getMe = async (): Promise<IAuthResponse> => {
  const res = await axiosInstance.get('auth/me');
  return res.data;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const res = await axiosInstance.post('auth/refresh', { refreshToken });
  return res.data;
};

export const getAllUsers = async (): Promise<IUserResponse> => {
  const res = await axiosInstance.get(`users?limit=0`);
  return res.data;
};

export const getAllRecipes = async (): Promise<IRecipesResponse> => {
  const res = await axiosInstance.get('recipes?limit=0');
  return res.data;
};
