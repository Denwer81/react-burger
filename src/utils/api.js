import handleFetch from "./handleFetch";
import { baseUrlApi } from "./constants";

function getBurgersDB() {
  return handleFetch({ url: `${baseUrlApi}ingredients` })
}

function getOrder(cart) {
  return handleFetch({ url: `${baseUrlApi}orders`, method: 'POST' }, cart)
}

function handleLogin(data) {
  return handleFetch({ url: `${baseUrlApi}auth/login`, method: 'POST' }, data)
}

function handleLogout(refreshToken) {
  return handleFetch(
    { url: `${baseUrlApi}auth/logout`, method: 'POST' }, refreshToken)
}

function handleGetUser(accessToken) {
  return handleFetch({ url: `${baseUrlApi}auth/user`, token: accessToken })
}

function handleUpdatetUser({ accessToken, values }) {
  return handleFetch(
    { url: `${baseUrlApi}auth/user`, method: 'PATCH', token: accessToken }, values)
}

function handleRegister(data) {
  return handleFetch({ url: `${baseUrlApi}auth/register`, method: 'POST' }, data)
}

function handleUpdateAccessToken(refreshToken) {
  return handleFetch({ url: `${baseUrlApi}auth/token`, method: 'POST' }, refreshToken)
}

function handleResetPasswordFirst(data) {
  return handleFetch({ url: `${baseUrlApi}password-reset`, method: 'POST' }, data)
}

function handleResetPasswordSecond(data) {
  return handleFetch(
    { url: `${baseUrlApi}password-reset/reset`, method: 'POST' }, data)
}

export {
  getBurgersDB,
  getOrder,
  handleLogin,
  handleLogout,
  handleGetUser,
  handleUpdatetUser,
  handleRegister,
  handleUpdateAccessToken,
  handleResetPasswordFirst,
  handleResetPasswordSecond,
}
