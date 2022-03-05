import request from './index';

export const postNewRoomAPI = (data) => {
  return request.post(`/rooms`, data);
};
