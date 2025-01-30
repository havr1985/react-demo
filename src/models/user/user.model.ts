export interface IUserResponse {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  birthDate: string;
  image: string;
  address: {
    address: string;
    city: string;
    country: string;
  };
}
