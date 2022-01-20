import request from '@/Lib/axiosConfig';

export const getMyInfo = () => {
  return request.get('/me');
};
