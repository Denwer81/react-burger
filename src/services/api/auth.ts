import { checkResponce } from "./checkResponce";
import { baseUrlApi } from "../../utils/constants";
import { IForgotPassword, IResetPassword } from './../types/auth';
import { IAuthPayload, ILoginData, IRegisterData, ITokenData, IUpdateUserData } from "../types/auth";

export const handleFetchRegister = async (data: IRegisterData) => {
  const response = await fetch(baseUrlApi + 'auth/register', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })

  const checkedResponce = await checkResponce(response)

  return checkedResponce as IAuthPayload;
}

export const handleFetchLogin = async (data: ILoginData) => {
  const response = await fetch(baseUrlApi + 'auth/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })

  const checkedResponce = await checkResponce(response)

  return checkedResponce as IAuthPayload;
}

export const handleFetchLogout = async (data: ITokenData) => {
  const response = await fetch(baseUrlApi + 'auth/logout', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })

  const checkedResponce = await checkResponce(response)

  return checkedResponce as IAuthPayload;
}

export const handleFetchGetUser = async (accessToken: ITokenData) => {
  const response = await fetch(baseUrlApi + 'auth/user', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken.token,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })

  const checkedResponce = await checkResponce(response)

  return checkedResponce as IAuthPayload;
}

export const handleFetchUpdateUser = async ({ accessToken, data }: IUpdateUserData) => {
  const response = await fetch(baseUrlApi + 'auth/user', {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })

  const checkedResponce = await checkResponce(response)

  return checkedResponce as IAuthPayload;
}

export const handleFetchUpdateAccessToken = async (refreshToken: ITokenData) => {
  const response = await fetch(baseUrlApi + 'auth/token', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(refreshToken),
  })

  const checkedResponce = await checkResponce(response)

  return checkedResponce as IAuthPayload;
}

export const handleFetchForgotPassword = async (data: IForgotPassword) => {
  const response = await fetch(baseUrlApi + 'password-reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })

  const checkedResponce = await checkResponce(response)

  return checkedResponce as IAuthPayload;
}

export const handleFetchResetPassword = async (data: IResetPassword) => {
  const response = await fetch(baseUrlApi + 'password-reset/reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })

  const checkedResponce = await checkResponce(response)

  return checkedResponce as IAuthPayload;
}
