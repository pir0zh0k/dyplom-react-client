import { IUser } from "@/types/UserTypes.ts";

export interface ILogin {
  username: string;
  password: string;
}

export interface IOnSubmit {
  access_token: string;
  user: IUser;
}
