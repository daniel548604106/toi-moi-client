import request from '@/Lib/axiosConfig';

export const postFriendRequestAPI = (username) => {
  return request.post(`/profile/friend/${username}`);
};

export const removeFriendRequest = (username) => {
  return request.post(`/profile/unfriend/${username}`);
};

export const rejectFriendRequest = (username) => {
  return request.post(`/profile/reject/${username}`);
};

export const getFriendList = () => {
  return request.get(`/friends`);
};
