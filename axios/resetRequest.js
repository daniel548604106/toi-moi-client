import request from '@/Lib/axiosConfig';

export const postForgotPassword = (email) => {
  return request.post('/reset', { email });
};

export const postPasswordReset = (token, password) => {
  return request.post('/reset/token', { token, password });
};
