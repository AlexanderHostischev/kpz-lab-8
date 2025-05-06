import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { api } from '../server';
import { AUTH_TOKEN_KEY } from '../const';

import type { ApiErrorResponse, ApiSuccessResponse } from '../types';
import type { AxiosResponse, AxiosError } from 'axios';

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication = async (): Promise<void> => {
      if (isAuthenticated) {
        await navigate({ to: '/posts' });
      }
    }
    void checkAuthentication();
  }, [isAuthenticated, navigate]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Валідація email
    if (!email) {
      newErrors.email = 'Email є обов\'язковим';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Невірний формат email';
      isValid = false;
    }

    // Валідація пароля
    if (!password) {
      newErrors.password = 'Пароль є обов\'язковим';
      isValid = false;
    } else if (password.length > 64) {
      newErrors.password = 'Пароль повинен бути менше 64 символів';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response: AxiosResponse<ApiSuccessResponse<string>> = await api.post('/auth/login', {
        email,
        password
      });

      const jwtToken = response.data.data;
      localStorage.setItem(AUTH_TOKEN_KEY, jwtToken);
      await navigate({ to: '/posts' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (
        axiosError.response?.status === 404 &&
        axiosError.response.data &&
        'errors' in axiosError.response.data
      ) {
        const newErrors: FormErrors = {};
        axiosError.response.data.errors.forEach((errorMessage) => {
          newErrors.general = errorMessage;
        });
        setErrors(newErrors);
      } else {
        console.error('Login error:', error);
        setErrors({
          general: 'Помилка при вході. Спробуйте пізніше.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gray-900 py-6">
          <h2 className="text-center text-3xl font-bold text-purple-400">
            Увійти в акаунт
          </h2>
        </div>

        <div className="p-8">
          {errors.general && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-300 text-sm">
              {errors.general}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
                <input
                  autoComplete="email"
                  id="email"
                  placeholder="your@email.com"
                  type="email"
                  value={email}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  onChange={(event) => { setEmail(event.target.value); }}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="password"
              >
                Пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
                <input
                  autoComplete="current-password"
                  id="password"
                  placeholder="••••••"
                  type="password"
                  value={password}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  onChange={(event) => { setPassword(event.target.value); }}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-colors duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                    </svg>
                    Зачекайте...
                  </>
                ) : (
                  'Увійти'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
