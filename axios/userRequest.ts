import request from './index';

export const getMyInfoAPI = () => {
  return request.get('/me');
};
