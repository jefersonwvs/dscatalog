import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = function (loginData: LoginData) {
  const headers = {
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = qs.stringify({
    // urlencoded body
    ...loginData,
    grant_type: 'password',
  });

  const request: AxiosRequestConfig = {
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    headers,
    data,
  };

  return axios(request);
};
