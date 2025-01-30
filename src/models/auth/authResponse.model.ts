export interface IAuthResponse {
  user: IAuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface IAuthUser {
  id: number;
  username: string;
  image: string;
}
