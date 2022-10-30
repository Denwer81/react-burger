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

function handleLogout(data) {
  return handleFetch({ url: `${baseUrlApi}auth/logout`, method: 'POST' }, data)
}

function handleRegister(data) {
  return handleFetch({ url: `${baseUrlApi}auth/register`, method: 'POST' }, data)
}

function handleRefreshToken(data) {
  return handleFetch({ url: `${baseUrlApi}auth/token`, method: 'POST' }, data)
}

function handleResetPasswordFirst(data) {
  return handleFetch({ url: `${baseUrlApi}password-reset`, method: 'POST' }, data)
}

function handleResetPasswordSecond(data) {
  return handleFetch({ url: `${baseUrlApi}password-reset/reset`, method: 'POST' }, data)
}

export {
  getBurgersDB,
  getOrder,
  handleLogin,
  handleLogout,
  handleRegister,
  handleRefreshToken,
  handleResetPasswordFirst,
  handleResetPasswordSecond,
}
