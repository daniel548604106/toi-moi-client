import request from '@/Lib/axiosConfig';

export const postNewRoom = (data) => {
  return request.post(`/rooms`, data);
};
