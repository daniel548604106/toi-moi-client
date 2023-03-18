import Cookie from 'js-cookie';

import convertFileToBase64 from '@/Utils/convertFileToBase64';

import request from './index';

const token = Cookie.get('token');

// 大踩雷＠@ 不要使用 async await ＋ foreach 。有地雷
// https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

// ImageKit 只接受 base64 ||  binary || url ，需要將 File object 轉換 ，but
// 1. Base64 太大了 -  base64 is a way of coding that enlarges the data by up to 30%,
// 2. URL.createObjectURL(file) 出來的 url ImageKit 是不會當成檔案，會寫 file Type; 'non-image'

// multipart/form-data is part of the standard http and allows to send binary data, because of that multipart is faster and consumes less bandwidth.

// https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload
export const postNewPostAPI = async ({ images, text, location, type }) => {
  const formData = new FormData();

  if (images?.length) {
    await Promise.all(
      images.map(async ({ file }, index) => {
        const convertedFile = await convertFileToBase64(file);
        formData.append(`images-${index}`, convertedFile);
      }),
    );
  }

  formData.append('text', text);
  formData.append('location', location);
  formData.append('type', type);
  return request.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
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
