import request from './index';

export const uploadStoryAPI = (data) => {
  return request.post('/stories/upload', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const getStoriesAPI = () => {
  return request.get('/stories');
};
export const uploadStoryImageAPI = (data) => {
  return request.post('/stories/upload/image', data);
};
