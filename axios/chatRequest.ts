import request from './index';

export const getAllChatsAPI = () => {
  return request.get('/chats');
};

export const getChatAPI = (id) => {
  return request.get(`/chats/chat/${id}`);
};

export const getChatUserInfoAPI = (senderId) => {
  return request.get(`/chats/userInfo/${senderId}`);
};

export const getSearchedChatsAPI = (searchText) => {
  return request.get(`/chats/search/${searchText}`);
};
