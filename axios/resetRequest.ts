import request from './index';

export const postForgotPasswordAPI = (email) => {
  return request.post('/reset', { email });
};

export const postPasswordResetAPI = (token, password) => {
  return request.post('/reset/token', { token, password });
};
