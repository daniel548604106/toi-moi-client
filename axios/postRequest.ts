import Cookie from 'js-cookie';

import request from '@/Lib/axiosConfig';

const token = Cookie.get('token');

export const postNewPostAPI = ({ image, text, location, type }) => {
  return request.post('/posts', { image, text, location, type });
};

export const getAllPostsAPI = (currentPage) => {
  return request.get(`/posts?page=${currentPage}`);
};

export const updatePostAPI = (id, text) => {
  return request.patch(`/posts/${id}`, { text });
};

export const getPostAPI = (id) => {
  return request.get(`/posts/${id}`);
};

// Delete
export const deletePostAPI = (id) => {
  return request.delete(`/posts/${id}`);
};

// Comment

export const commentPostAPI = (id, text) => {
  return request.post(`/posts/comment/${id}`, { text });
};

// Like

export const likePostAPI = (id) => {
  return request.post(`/posts/like/${id}`);
};

export const unlikePostAPI = (id) => {
  return request.post(`/posts/unlike/${id}`);
};

// Like a Comment

export const likeCommentAPI = (postId, commentId) => {
  return request.post(`/posts/like/${postId}/${commentId}`);
};

// Unlike a Comment
export const unlikeCommentAPI = (postId, commentId) => {
  return request.post(`/posts/unlike/${postId}/${commentId}`);
};

// Delete a Comment
export const deleteCommentAPI = (postId, commentId) => {
  return request.delete(`/posts/${postId}/${commentId}`);
};
