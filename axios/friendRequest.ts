import request from '@/Lib/axiosConfig';

export const postFriendRequestAPI = (username) => {
  return request.post(`/profile/friend/${username}`);
};

export const removeFriendRequestAPI = (username) => {
  return request.post(`/profile/unfriend/${username}`);
};

export const rejectFriendRequestAPI = (username) => {
  return request.post(`/profile/reject/${username}`);
};

export const getFriendsListAPI = () => {
  return request.get(`/friends`);
};
