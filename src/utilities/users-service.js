// Service modules export business/app logic
// such as managing tokens, etx.
// Service modules often depend upon APU modules
// for making AJAX requests tyo the server

import * as usersAPI from './users-api';


export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  // persist the "token"
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export async function login(userData) {
  const token = await usersAPI.login(userData);
  localStorage.setItem('token', token);
  return getUser();
}

export function getToken() {
  // getItem will return null if the key doesn't exist
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's expiration is expressed in seconds, not miliseconds.
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null
}
