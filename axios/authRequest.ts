import request from './index';

export const postLoginAPI = (data) => {
  return request.post(`/login`, data);
};

export const postSignupAPI = (data) => {
  return request.post(`/signup`, data);
};
