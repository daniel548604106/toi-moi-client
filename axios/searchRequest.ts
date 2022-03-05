import request from './index';

export const searchRequestAPI = (searchText) => {
  return request.get(`/search/${searchText}`);
};

export const getRecentSearchAPI = () => {
  return request.get('/search/history/recent');
};

export const getAllSearchAPI = () => {
  return request.get(`/search/history/all`);
};

export const postUserSearchAPI = (username) => {
  return request.post('/search/user', { username });
};
export const postKeywordSearchAPI = (keyword) => {
  return request.post('/search/keyword', { keyword });
};

export const deleteHistoryAPI = (historyId) => {
  return request.post('/search/history', { historyId });
};
