import request from '@/Lib/axiosConfig';

export const getMyInfoAPI = () => {
  return request.get('/me');
};
