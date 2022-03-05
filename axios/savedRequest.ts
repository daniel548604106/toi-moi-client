import request from './index';

export const getSavedPostsAPI = () => {
  return request.get('/saved/posts');
};

export const postNewSavedPostAPI = (data) => {
  return request.post('/saved/posts/post', data);
};

export const deleteSavedPostAPI = (postId) => {
  return request.post(`/saved/posts/delete/${postId}`);
};
