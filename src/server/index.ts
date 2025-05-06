import axios, { type InternalAxiosRequestConfig } from 'axios';
import { AUTH_TOKEN_KEY } from '../const';

declare global {
  interface ImportMetaEnv {
    VITE_APP_ENVIRONMENT: string;
    VITE_API_BASE_URL: string;
  }
}

export const api = axios.create({
  baseURL: import.meta.env['VITE_API_BASE_URL'],
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) config.headers.Authorization = `${token}`;
    return config;
  },
  (error: Error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error instanceof Error ? error : new Error('Unknown error occurred'));
  }
);
