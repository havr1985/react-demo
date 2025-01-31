export interface IAuthResponse {
  id: number;
  username: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface IAuthUser {
  id: number;
  username: string;
  image: string;
}
