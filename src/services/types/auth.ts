import { REQUEST_STATUS } from "./types";

export interface iUser {
  email: string;
  name: string;
}

export interface IAuth {
  isAuth: boolean;
  user: iUser;
  loadingStatus: keyof typeof REQUEST_STATUS;
  error: string | null;
}

export interface IAuthPayload {
  success: boolean;
  user?: iUser;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export interface IRegisterData {
  email: string;
  password: string;
  name: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IUpdateUserData {
  data: IRegisterData;
  accessToken: string;
}

export interface ITokenData {
  token: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  token: string;
}


