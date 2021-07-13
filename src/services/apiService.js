import axios from 'axios';
import * as authService from './authService';

import getErrorText from '../utils/getErrorText';
const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

instance.interceptors.request.use(
  async (request) => {
    if (authService.isAccessTokenExpired() && authService.getRefreshToken()) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            request.headers.Authorization = `Bearer ${token}`;
            return request;
          })
          .catch((error) => Promise.reject(error));
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        authService
          .refreshTokens()
          .then((response) => {
            request.headers.Authorization = `Bearer ${response.data.token}`;
            processQueue(null, response.data.token);
            resolve(request);
          })
          .catch((error) => {
            processQueue(error, null);
            reject(error);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }
    request.headers.Authorization = `Bearer ${authService.getAccessToken()}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(new Error(getErrorText(error)));
  }
);

export default instance;
